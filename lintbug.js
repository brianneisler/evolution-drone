/*
 * Copyright (c) 2014 Brian Neisler. http://brianneisler.com
 *
 * evolution-drone may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Common Modules
//-------------------------------------------------------------------------------

var bugcore             = require('bugcore');
var bugflow             = require('bugflow');
var bugfs               = require('bugfs');
var buildbug            = require('buildbug');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var enableModule        = buildbug.enableModule;
var TypeUtil            = bugcore.TypeUtil;
var $series             = bugflow.$series;
var $task               = bugflow.$task;


//-------------------------------------------------------------------------------
// Enable Modules
//-------------------------------------------------------------------------------

var lintbug             = enableModule("lintbug");


//-------------------------------------------------------------------------------
// Lint Tasks
//-------------------------------------------------------------------------------

lintbug.lintTask("cleanupExtraSpacingAtEndOfLines", function(lintFile, callback) {
    var fileContents    = lintFile.getFileContents();
    var lines           = fileContents.split("\n");
    lines.forEach(function(line, index) {
        lines[index] = bugcore.StringUtil.rtrim(line);
    });
    lintFile.setFileContents(lines.join("\n"));
    callback();
});

lintbug.lintTask("ensureNewLineEnding", function(lintFile, callback) {
    var fileContents    = lintFile.getFileContents();
    var lines           = fileContents.split("\n");
    var lastLine        = lines.pop();
    lines.push(lastLine);
    if (lastLine !== "") {
        lines.push("");
    }
    lintFile.setFileContents(lines.join("\n"));
    callback();
});

lintbug.lintTask("indentEqualSignsForPreClassVars", function(lintFile, callback) {
    var indentSpacing   = 4;
    var fileContents    = lintFile.getFileContents();
    var lines           = fileContents.split("\n");
    var startIndex      = bugcore.ArrayUtil.indexOf(lines, /^\s*\/\/ Context\s*$/);
    var endIndex        = bugcore.ArrayUtil.indexOf(lines, /^\s*\/\/ (Declare Class|Declare Interface|Declare Tests|BugYarn)\s*$/);
    var varRegex        = /^(\s*)var ([\w|\$]+)\s*=(?:\s*)(.*)$/;
    var varObjects      = [];
    var longestIndent   = 0;
    if (startIndex > -1 && endIndex > -1) {
        for (var i = startIndex; i < endIndex; i++) {
            var line        = lines[i];
            var results     = line.match(varRegex);
            if (results) {
                var indent  = results[1];
                var varName = results[2];
                varObjects.push({
                    index: i,
                    indent: indent,
                    name: varName,
                    afterEqualsContent: results[3]
                });

                //NOTE BRN: Add 2 at the end so that we are at least two spaces away from the variable name
                var indentLength = Math.ceil((indent.length + ("var ").length + varName.length + 2) / indentSpacing);
                if (indentLength > longestIndent) {
                    longestIndent = indentLength;
                }
            }
        }
        varObjects.forEach(function(varObject) {
            var numberCharsBeforeEquals = longestIndent * indentSpacing;
            var preEqualsText = bugcore.StringUtil.rpad(varObject.indent + "var " + varObject.name, " ", numberCharsBeforeEquals);
            lines[varObject.index] = preEqualsText + "= " + varObject.afterEqualsContent;
        });
    }
    lintFile.setFileContents(lines.join("\n"));
    callback();
});

lintbug.lintTask("orderBugpackRequires", function(lintFile, callback) {
    var fileContents    = lintFile.getFileContents();
    fileContents = sortBugpackRequires(fileContents);
    lintFile.setFileContents(fileContents);
    callback();
});

lintbug.lintTask("orderRequireAnnotations", function(lintFile, callback) {
    var fileContents    = lintFile.getFileContents();
    fileContents = sortRequireAnnotations(fileContents);
    lintFile.setFileContents(fileContents);
    callback();
});

lintbug.lintTask("updateCopyright", function(lintFile, callback) {
    var fileContents    = lintFile.getFileContents();
    var copyright       = getCopyright();
    var copyrightRegex  = /^(\s*)\/\*(([^.]|[.])+?)Copyright \(c\)(([^.]|[.])+?)\*\/(\s*)/;
    if (copyrightRegex.test(fileContents)) {
        fileContents = fileContents.replace(copyrightRegex, copyright + "\n\n");
    } else {
        fileContents = copyright + "\n\n" + fileContents;
    }
    lintFile.setFileContents(fileContents);
    callback();
});


//-------------------------------------------------------------------------------
// Helper Methods
//-------------------------------------------------------------------------------

/**
 * @private
 * @param {string} fileContents
 * @returns {Array.<{index: number, line: string}>}
 */
var generateLines = function(fileContents) {
    return bugcore.StringUtil.split(fileContents, "\n", function(line, index) {
        return {
            index: index,
            line: line
        };
    });
};

var copyright = null;
/**
 * @private
 * @return {string}
 */
var getCopyright = function() {
    if (copyright === null) {
        var copyrightText   = bugcore.StringUtil.trim(bugfs.readFileSync(__dirname + "/COPYRIGHT", 'utf8'));
        var copyrightLines  = copyrightText.split("\n");
        copyright = "/*\n";
        copyrightLines.forEach(function(copyrightLine) {
            copyrightLine = bugcore.StringUtil.trim(copyrightLine);
            if (copyrightLine !== "") {
                copyright += " * " + copyrightLine + "\n";
            } else {
                copyright += " *\n";
            }
        });
        copyright += " */\n";
    }
    return copyright;
};

/**
 * @private
 * @param {Array.<{index: number, line: string}>} lines
 * @return {string}
 */
var mergeLines = function(lines) {
    var result = "";
    var first = true;
    lines.forEach(function(line) {
        if (first) {
            result += line.line;
            first = false;
        } else {
            result += "\n" + line.line;
        }
    });
    return result;
};

/**
 * @private
 * @param {string} fileContents
 * @return {string}
 */
var sortRequireAnnotations = function(fileContents) {
    var lines   = generateLines(fileContents);
    lines.sort(function(a, b) {
        var resultsA = a.line.match(/^\s*\/\/\s*@Require\(('|")((?:\w|\.)*)\1\)\s*$/);
        var resultsB = b.line.match(/^\s*\/\/\s*@Require\(('|")((?:\w|\.)*)\1\)\s*$/);

        if (resultsA && resultsB) {
            var partsA = resultsA[2].split(".");
            var partsB = resultsB[2].split(".");
            var classNameA = partsA.pop();
            var classNameB = partsB.pop();
            var packageNameA = partsA.join(".");
            var packageNameB = partsB.join(".");
            if (packageNameA < packageNameB) {
                return -1;
            }
            if (packageNameA > packageNameB) {
                return 1;
            }
            if (classNameA < classNameB) {
                return -1;
            }
            if (classNameA > classNameB) {
                return 1;
            }
        }
        if (a.index < b.index) {
            return -1;
        }
        return 1;
    });
    return mergeLines(lines);
};

/**
 * @private
 * @param {string} fileContents
 * @return {string}
 */
var sortBugpackRequires = function(fileContents) {
    var lines   = generateLines(fileContents);
    lines.sort(function(a, b) {
        var resultsA = a.line.match(/^\s*var \w+\s+=\s+bugpack\.require\(('|")((?:\w|\.)*)\1\);\s*$/);
        var resultsB = b.line.match(/^\s*var \w+\s+=\s+bugpack\.require\(('|")((?:\w|\.)*)\1\);\s*$/);

        if (resultsA && resultsB) {
            var partsA = resultsA[2].split(".");
            var partsB = resultsB[2].split(".");
            var classNameA = partsA.pop();
            var classNameB = partsB.pop();
            var packageNameA = partsA.join(".");
            var packageNameB = partsB.join(".");
            if (packageNameA < packageNameB) {
                return -1;
            }
            if (packageNameA > packageNameB) {
                return 1;
            }
            if (classNameA < classNameB) {
                return -1;
            }
            if (classNameA > classNameB) {
                return 1;
            }
        }
        if (a.index < b.index) {
            return -1;
        }
        return 1;
    });
    return mergeLines(lines);
};
