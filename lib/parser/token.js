/*
 * Token Class
*/

'use strict';

/**
 * new Token(type)
 * 
 * Create new Token and fill passed properties
 */
function Token(type, tag, value, line, column) {
    this.type = type
    /// - type.     A 'TokenType' corresponding to the type 
    ///             of the newly created 'Token'
    ///             (eg. "paragraph", "heading"). 

    this.tag = tag
    /// - tag.      The 'String' coresponding to the HTML
    ///             tag (e.g. "p", "h1")

    this.value = value
    /// - value.    The 'String' value of the token.
    ///             Contains all the characters in the Token

    this.line = line
    /// - line.     The line 'Number' where the token
    ///             was encountered in the source code.

    this.column = column
    /// - column.   The column 'Numbers' where the token
    ///             was encountered in the source code.

    this.attrs = null
    /// - attrs.    The 'Array of String' which represent
    ///             the HTML attribute (e.g. "href", "class") 
    ///             Format: [ [name1, value1], [name2, value2] ]

    this.hidden = false
    /// - hidden.   A 'Boolean' to identify if we render 
    ///             or not the element (e.g. "comments")

    this.meta = null
    /// - meta.     A place to store 'Any' kind of value

}

/**
 * Return a stringify version of the Token inside the console
 *  
 */
Token.prototype.toString = function toString() {
    return '<' + this.type + ', ' + this.value + ', ' + this.line + ':' + this.column + '>';
}

/**
 * Search attribute index by name
 * @param {String} name 
 */
Token.prototype.attrIndex = function attrIndex(name) {
    var attrs, length

    // If nothing
    if (!this.attrs) {return -1}

    attrs = this.attrs

    // Search the attributes inside all the array
    for (let i = 0, length = attrs.length; i < length; i++) {
        if (attrs[i][0] === name) {return i;}
    }

    // If nothing find
    return -1
}

/**
 * Add attribute to the list. Init the list if necessary
 * @param {[String, String]} attribute > Format : `[name, value]` 
 */
Token.prototype.attrPush = function attrPush(attribute) {
    
    // If there are attributes, push the value inside
    if (this.attrs) {
        this.attrs.push(attribute)
    }
    // Else init the varable
    else {
        this.attrs = [attribute]
    }
}

/**
 * Create an attribute name with it value.
 * Override the old attribute if it already exist
 * @param {String} name 
 * @param {String} value 
 */
Token.prototype.attrSet = function attrSet(name, value) {
    var id = this.attrIndex(name)
    var data = [name, value]

    // If doesn't exist
    if (id < 0) {
        this.attrPush(data)
    }
    else {
        this.attrs[id] = data
    }
}

/**
 * Get the value of an attribute by his name.
 * Return `null` if it doesn't exist
 * @param {String} name 
 */
Token.prototype.attrGet = function attrGet(name) {
    var id = this.attrIndex(name)
    var value = null

    //If exist
    if (id >= 0) { value = this.attrs[id][1] }

    return value
}

/**
 * Join a value to an attribute separate by a space.
 * If the attribute doesn't exist, create a new one
 * @param {String} name 
 * @param {String} value 
 */
Token.prototype.attrJoin = function attrJoin(name, value) {
    var id = this.attrIndex(name)
    var data = [name, value]

    // If doesn't exist
    if (id < 0) {
        this.attrPush(data)
    }
    else {
        this.attrs[id][1] = this.attrs[id][1] + ' ' + value
    }
}

module.exports = Token