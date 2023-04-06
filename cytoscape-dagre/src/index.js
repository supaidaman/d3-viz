import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import expandCollapse from "cytoscape-expand-collapse";
import fcose from 'cytoscape-fcose';
// import nodeEditing from 'cytoscape-node-editing';

cytoscape.use(dagre);
cytoscape.use(expandCollapse);
cytoscape.use(fcose);
//cytoscape.use(nodeEditing);

var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),

    boxSelectionEnabled: false,
    autounselectify: true,

    layout: {
        name: "dagre"
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

    elements: {
        nodes: [
            { data: { id: "0" } },
            { data: { id: "n0", parent: 0 } },
            { data: { id: "n1" } },
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


}));
// cy.nodeEditing({
//     resizeToContentCueImage: 'https://raw.githubusercontent.com/iVis-at-Bilkent/cytoscape.js-node-editing/master/resizeCue.svg',
//     isNoResizeMode: function (node) { return node.is(".noResizeMode") },
//     autoRemoveResizeToContentCue: false,
//     zIndex: 1000
// });

var api = cy.expandCollapse({
    layoutBy: {
        name: "dagre",
        animate: true,
        randomize: false,
        fit: true
    },
    fisheye: true,
    animate: true,
    undoable: false,
    expandCueImage: "https://raw.githubusercontent.com/iVis-at-Bilkent/cytoscape.js-expand-collapse/master/demo/icon-plus.png",
    collapseCueImage: "https://raw.githubusercontent.com/iVis-at-Bilkent/cytoscape.js-expand-collapse/master/demo/icon-minus.png"
});


cy.layout({ name: "dagre" }).run();