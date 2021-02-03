export var domQuery = {
    htmlCollectionToArray: function(foundNodes) {
        var nodes = [],
            index;

        if (!foundNodes || !foundNodes.length) {
            return nodes;
        }

        for (index = 0; index < foundNodes.length; index++) {
            nodes.push(foundNodes[index]);
        }

        return nodes;
    },
    find: function(selector) {
        // we use querySelectorAll only on document, not on nodes because of its unexpected behavior. See for
        // instance http://stackoverflow.com/questions/11503534/jquery-vs-document-queryselectorall and
        // http://jsfiddle.net/QdMc5/ and http://ejohn.org/blog/thoughts-on-queryselectorall
        if (!document.querySelectorAll || !selector) {
            return []; // we do not support all browsers
        }

        var foundNodes = document.querySelectorAll(selector);

        return this.htmlCollectionToArray(foundNodes);
    },
    findMultiple: function(selectors) {
        if (!selectors || !selectors.length) {
            return [];
        }

        var index, foundNodes;
        var nodes = [];
        for (index = 0; index < selectors.length; index++) {
            foundNodes = this.find(selectors[index]);
            nodes = nodes.concat(foundNodes);
        }

        nodes = this.makeNodesUnique(nodes);

        return nodes;
    },
    findNodesByTagName: function(node, tagName) {
        if (!node || !tagName || !node.getElementsByTagName) {
            return [];
        }

        var foundNodes = node.getElementsByTagName(tagName);

        return this.htmlCollectionToArray(foundNodes);
    }
};

export function isDefined(property) {
    // workaround https://github.com/douglascrockford/JSLint/commit/24f63ada2f9d7ad65afc90e6d949f631935c2480
    var propertyType = typeof property;

    return propertyType !== 'undefined';
}


export function checkIfVisible(el) {

    if (!el) {
        return false;
    }

    function _getStyle(el, property) {
        if (window.getComputedStyle) {
            return document.defaultView.getComputedStyle(el, null)[property];
        }
        if (el.currentStyle) {
            return el.currentStyle[property];
        }
    }

    if (
        '0' === _getStyle(el, 'opacity') ||
        'none' === _getStyle(el, 'display') ||
        'hidden' === _getStyle(el, 'visibility')
    ) {
        return false;
    }

    return true;
}


var findElements = function(selector) {
    //wildcard = "~" === this.value.substr(0, 1);
    //document.querySelector('iframe[src^="http://www.youtube.com"]');
    //[id^='someId'] will match all ids starting with someId.
    //[id$='someId'] will match all ids ending with someId.
    //[id*='someId'] will match all ids containing someId.

    if (!selector) return;
    domQuery.find(selector);
}