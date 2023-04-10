
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import "cytoscape-navigator/cytoscape.js-navigator.css";
var nodeHtmlLabel = require("cytoscape-node-html-label");
var expandCollapse = require("cytoscape-expand-collapse");
var contextMenus = require("cytoscape-context-menus");
var navigator = require("cytoscape-navigator");

cytoscape.use(dagre);

if (typeof cytoscape("core", "expandCollapse") === "undefined") {
    expandCollapse(cytoscape);
}

if (typeof cytoscape("core", "nodeHtmlLabel") === "undefined") {
    nodeHtmlLabel(cytoscape);
}
if (typeof cytoscape("core", "contextMenus") === "undefined") {
    contextMenus(cytoscape);
}
if (typeof cytoscape("core", "navigator") === "undefined") {
    navigator(cytoscape);
}

const data = {
    nodes: [
        { data: { id: "0" } },
        { data: { id: "n0", parent: 0 } },
        { data: { id: "n1", parent: 0 } },
        { data: { id: "n2" } },
        { data: { id: "n3" } },
        { data: { id: "n4" } },
        { data: { id: "n5" } },
        { data: { id: "n6" } },
        { data: { id: "n7" } },
        { data: { id: "n8" } },
        { data: { id: "n9" } },
        { data: { id: "n10" } },
        { data: { id: "n11" } },
        { data: { id: "n12" } },
        { data: { id: "n13" } },
        { data: { id: "n14" } },
        { data: { id: "n15" } },
        { data: { id: "n16" } }
    ],
    edges: [
        { data: { source: "n0", target: "n1" } },
        { data: { source: "n1", target: "n2" } },
        { data: { source: "n1", target: "n3" } },
        { data: { source: "n4", target: "n5" } },
        { data: { source: "n4", target: "n6" } },
        { data: { source: "n6", target: "n7" } },
        { data: { source: "n6", target: "n8" } },
        { data: { source: "n8", target: "n9" } },
        { data: { source: "n8", target: "n10" } },
        { data: { source: "n11", target: "n12" } },
        { data: { source: "n12", target: "n13" } },
        { data: { source: "n13", target: "n14" } },
        { data: { source: "n13", target: "n15" } }
    ]
}

var cy = cytoscape({

    container: document.getElementById("cy"),

    boxSelectionEnabled: false,
    autounselectify: true,

    ready: function () {


        var api = this.expandCollapse({
            layoutBy: {
                name: "dagre",
                animate: true,
                randomize: false,
                fit: true
            },
            fisheye: true,
            animate: true,
            undoable: false,
            expandCollapseCuePosition: "top-left",
            expandCollapseCueSize: 16,
            expandCollapseCueLineSize: 24,
            expandCueImage: "./images/icon-plus.png",
            collapseCueImage: "./images/icon-minus.png",
        });


    },

    style: [
        {
            selector: "node",
            style: {
                content: "data(id)",
                "text-opacity": 0.5,
                "text-valign": "center",
                "text-halign": "right",
                'background-color': '#ad1a66'
            }
        },
        {
            selector: ':parent',
            style: {
                'background-opacity': 0.333
            }
        },
        {
            selector: "edge",
            style: {
                "curve-style": "bezier",
                width: 4,
                "target-arrow-shape": "triangle",
                'line-color': '#ad1a66',
                "target-arrow-color": "#9dbaea"
            }
        },
        {
            selector: 'edge.meta',
            style: {
                'width': 2,
                'line-color': 'red'
            }
        },
        {
            selector: ':selected',
            style: {
                'overlay-color': "#6c757d",
                'overlay-opacity': 0.3,
                'background-color': "#999999"
            }
        }

    ],

    layout: {
        name: "dagre",
        padding: 24,
        spacingFactor: 1.5
    },

    elements: data,

    zoomingEnabled: true,
    userZoomingEnabled: true,
    autoungrabify: false
});


var defaults = {
    container: false, // html dom element
    viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
    thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
    thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
    dblClickDelay: 200, // milliseconds
    removeCustomContainer: false, // destroy the container specified by user on plugin destroy
    rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
};

var nav = cy.navigator(defaults);
