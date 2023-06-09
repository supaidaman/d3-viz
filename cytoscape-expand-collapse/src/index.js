import "./styles.css";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import "cytoscape-navigator/cytoscape.js-navigator.css";
import data from "./data2";

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

var options = {
  evtType: "cxttap",
  menuItems: [
    {
      id: "details",
      content: "View Details...",
      tooltipText: "View Details",
      selector: "node, edge",
      onClickFunction: function (event) { },
      hasTrailingDivider: true
    },
    {
      id: "generateReport",
      content: "Generate Report",
      selector: "node, edge",
      onClickFunction: function (event) { },
      hasTrailingDivider: true
    }
  ],
  menuItemClasses: ["custom-menu-item", "custom-menu-item:hover"],
  contextMenuClasses: ["custom-context-menu"]
};

var cy = cytoscape({
  container: document.getElementById("cy"),

  ready: function () {
    var instance = this.contextMenus(options);

    var api = this.expandCollapse({
      layoutBy: {
        name: "dagre",
        animate: "end",
        randomize: false,
        fit: false
      },
      fisheye: false,
      animate: true,
      undoable: false,
      cueEnabled: true,
      expandCollapseCuePosition: "top-left",
      expandCollapseCueSize: 16,
      expandCollapseCueLineSize: 24,
      expandCueImage: "../imgs/ic_expand_more.svg",
      collapseCueImage: "../imgs/ic_expand_less.svg",
      expandCollapseCueSensitivity: 1,
      edgeTypeInfo: "edgeType",
      groupEdgesOfSameTypeOnCollapse: false,
      allowNestedEdgeCollapse: true,
      zIndex: 999
    });

    document
      .getElementById("collapseAll")
      .addEventListener("click", function () {
        api.collapseAll();
      });

    document.getElementById("expandAll").addEventListener("click", function () {
      api.expandAll();
    });

    document
      .getElementById("adminView")
      .addEventListener("click", function () { });
    document
      .getElementById("lifecycleView")
      .addEventListener("click", function () { });
    document
      .getElementById("usageView")
      .addEventListener("click", function () { });
  },

  style: [
    //CORE
    {
      selector: "core",
      css: {
        "active-bg-size": 0 //The size of the active background indicator.
      }
    },

    //NODE
    {
      selector: "node",
      css: {
        width: "38px",
        height: "38px",
        "font-family": "Nokia Pure Regular",
        "background-opacity": "1"
      }
    },
    //GROUP
    {
      selector: "node.cy-expand-collapse-collapsed-node",
      css: {
        width: "56px",
        height: "56px",
        "background-opacity": "0",
        "font-family": "Nokia Pure Regular"
      }
    },
    {
      selector: "$node > node",
      css: {
        "background-color": "#fff",
        "background-opacity": "1",
        "border-width": "1px",
        "border-color": "#dcdcdc",

        //LABEL
        //label: "data(name)",
        color: "#000",
        shape: "rectangle",
        "text-opacity": "0.56",
        "font-size": "10px",
        "text-transform": "uppercase",
        "text-wrap": "none",
        "text-max-width": "75px",
        "padding-top": "16px",
        "padding-left": "16px",
        "padding-bottom": "16px",
        "padding-right": "16px"
      }
    },
    {
      selector: ":parent",
      css: {
        "text-valign": "top",
        "text-halign": "center"
      }
    },
    //EDGE
    {
      selector: "edge",
      style: {
        width: 1,
        "line-color": "#b8b8b8",
        "curve-style": "bezier",

        //LABEL
        label: ""
      }
    },
    {
      selector: "edge.hover",
      style: {
        width: 2,
        "line-color": "#239df9"
      }
    },
    {
      selector: "edge:selected",
      style: {
        width: 1,
        "line-color": "#239df9"
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

//cy.fit();
//NODE EVENTS
cy.on("mouseover", "node", function (e) {
  e.target.addClass("hover");
});
cy.on("mouseout", "node", function (e) {
  e.target.removeClass("hover");
});

cy.on("mousedown", "node", function (e) {
  e.target.addClass("hover");
});
cy.on("click", "node", function (e) {
  console.log("clicked:" + this.id());
});

//EDGES EVENTS
cy.on("mouseover", "edge", function (e) {
  e.target.addClass("hover");
});
cy.on("mouseout", "edge", function (e) {
  e.target.removeClass("hover");
});

cy.nodeHtmlLabel([
  {
    query: ".groupIcon",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic alarmSeverity-${data.alarmSeverity}">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.displayName}</span>
              </div>`;
    }
  },
  {
    query: ".groupIcon.hover",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic hover alarmSeverity-${data.alarmSeverity
        }">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.displayName}</span>
              </div>`;
    }
  },
  {
    query: ".groupIcon:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic selected alarmSeverity-${data.alarmSeverity
        }">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.displayName}</span>
              </div>`;
    }
  },
  {
    query: ".groupIcon.hover:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                <span class="group-graphic hover selected alarmSeverity-${data.alarmSeverity
        }">
                  <i class="icon icon-group"></i>
                  <span class="overlay"></span>
                </span>
                <span class="group-label">${data.displayName}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-severity_badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-pm_badge">
                  <i class="icon icon-pm" /></i>
                  <span>PM</span>
                </span>
                <span class="element-graphic operationalState-${data.operationalState}">
                  <i class="icon icon-${data.kind}" /></i>
                  <span class="overlay"></span>
                </span>
                <span title="${data.displayName}" class="element-label">${data.displayName}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon.hover",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-severity_badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-pm_badge">
                  <i class="icon icon-pm" /></i>
                  <span>PM</span>
                </span>
                <span class="element-graphic hover operationalState-${data.operationalState}">
                  <i class="icon icon-${data.kind} icon-hover" /></i>
                  <span class="overlay"></span>
                </span>
                <span title="${data.displayName}" class="element-label">${data.displayName}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-severity_badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-pm_badge">
                  <i class="icon icon-pm" /></i>
                  <span>PM</span>
                </span>
                <span class="element-graphic selected operationalState-${data.operationalState}">
                  <i class="icon icon-${data.kind}" /></i>
                  <span class="overlay"></span>  
                </span>
                <span title="${data.displayName}" class="element-label">${data.displayName}</span>
              </div>`;
    }
  },
  {
    query: ".nodeIcon.hover:selected",
    halign: "center",
    valign: "center",
    halignBox: "center",
    valignBox: "center",
    tpl: function (data) {
      return `<div class="element ${data._hidden}">
                <span class="element-severity_badge">
                  <i class="icon icon-${data.alarmSeverity}" /></i>
                </span>
                <span class="element-pm_badge">
                  <i class="icon icon-pm" /></i>
                  <span>PM</span>
                </span>
                <span class="element-graphic hover selected operationalState-${data.operationalState}">
                  <i class="icon icon-${data.kind}" /></i>
                  <span class="overlay"></span>
                </span>
                <span title="${data.displayName}" class="element-label">${data.displayName}</span>
              </div>`;
    }
  }
]);

cy.nodes().on("expandcollapse.beforecollapse", function (e) {
  console.log("Triggered before a node is collapsed");
});

cy.nodes().on("expandcollapse.aftercollapse", function (e) {
  console.log("Triggered after a node is collapsed");
});

cy.nodes().on("expandcollapse.beforeexpand", function (e) {
  console.log("Triggered before a node is expanded");
});

cy.nodes().on("expandcollapse.afterexpand", function (e) {
  console.log("Triggered after a node is expanded");
});

cy.edges().on("expandcollapse.beforecollapseedge", function (e) {
  console.log("Triggered before an edge is collapsed");
});

cy.edges().on("expandcollapse.aftercollapseedge", function (e) {
  console.log("Triggered after an edge is collapsed");
});

cy.edges().on("expandcollapse.beforeexpandedge", function (e) {
  console.log("Triggered before an edge is expanded");
});

cy.edges().on("expandcollapse.afterexpandedge", function (e) {
  console.log("Triggered after an edge is expanded");
});

cy.nodes().on("expandcollapse.beforecollapse", function (event) {
  var node = this;
  event.cy
    .nodes()
    .filter((entry) => entry.data().parent === node.id())
    .map((entry) => entry.data("_hidden", "node-hidden"));
  node.data("_hidden", "");
});

cy.nodes().on("expandcollapse.afterexpand", function (event) {
  var node = this;
  event.cy
    .nodes()
    .filter((entry) => entry.data().parent === node.id())
    .map((entry) => entry.data("_hidden", ""));
  node.data("_hidden", "node-hidden");
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
