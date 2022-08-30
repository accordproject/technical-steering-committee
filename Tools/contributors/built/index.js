"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gitlog_1 = require("gitlog");
var result = (0, gitlog_1.default)({
    repo: "foo",
    fields: ["subject", "authorName", "authorDate"],
});
console.log(result);
