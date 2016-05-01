var PanelWin3js = PanelWin3js || {}

console.log("in panel.js: start running");

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

// Change the prefix of signals.js library. It is all low case.
var SIGNALS = signals;
delete window.signals;

PanelWin3js.editor = new Editor()

//////////////////////////////////////////////////////////////////////////////
//              connect background page
//////////////////////////////////////////////////////////////////////////////

PanelWin3js.initBackgroundConnection()
// PanelWin3js.initLeftSideBar()
// PanelWin3js.initRightSideBar()
PanelWin3js.initSplash()

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////

console.log("in panel.js: stop running");
