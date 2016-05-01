var PanelWin3js = PanelWin3js || {};

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle panel for object3d
 *
 * @constructor
 */
PanelWin3js.PanelTreeView = function () {

    var container = UI.CollapsiblePanelHelper.createContainer('BROWSER', 'leftSidebarSceneBrowser', false);

    container.dom.addEventListener('click', function () {
        treeView.clearActive();
        PanelWin3js.plainFunction(function () {
            console.log('in panel-ui-treeview.js: unselecting item');
            InspectedWin3js.selectUuid(null)
        });
        console.log('click on empty panel', arguments)
    });


    //////////////////////////////////////////////////////////////////////////////////
    //		popupMenu
    //////////////////////////////////////////////////////////////////////////////////

    var popupMenu = UI.PopupMenuHelper.createSelect({
        '':            '--- Options ---',
        'collapseAll': 'Collapse All',
        'expandAll':   'Expand All'
    }, onPopupMenuChange);
    container.titleElement.add(popupMenu);
    container.dom.appendChild(document.createElement('br'));

    function onPopupMenuChange(value) {
        if (value === 'collapseAll') {
            treeView.getRoot().children.forEach(function (child) {
                child.collapseAll()
            })
        } else if (value === 'expandAll') {
            treeView.getRoot().children.forEach(function (child) {
                child.expandAll()
            })
        } else {
            console.assert(false)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    //		Comments
    //////////////////////////////////////////////////////////////////////////////////

    container.content.appendChild(document.createElement('br'));

    // create TreeView
    var treeView = new TreeView(container.content);

    //////////////////////////////////////////////////////////////////////////////
    //              Code Separator
    //////////////////////////////////////////////////////////////////////////////

    treeView.onSelect = function (object3dUuid) {
        PanelWin3js.plainFunction(function (uuid) {
            console.log('trying to select object3d uuid', uuid);
            InspectedWin3js.selectUuid(uuid)
        }, [object3dUuid])
    };
    treeView.onToggleVisibility = function (object3dUuid) {
        PanelWin3js.plainFunction(function (uuid) {
            console.log('in panel-ui-treeview.js: toggle visibility in uuid', uuid);
            var object3d = InspectedWin3js.getObjectByUuid(uuid);
            object3d.visible = object3d.visible !== true
        }, [object3dUuid])
    };
    treeView.onExport = function (object3dUuid) {
        PanelWin3js.plainFunction(function (uuid) {
            var object3d = InspectedWin3js.getObjectByUuid(uuid);
            window.$object3d = object3d;
            console.log('in panel-ui-treeview.js: Object3D exported as $object3d');
            console.dir($object3d)
        }, [object3dUuid])
    };

    //////////////////////////////////////////////////////////////////////////////////
    //		process updateObject3DTreeView
    //////////////////////////////////////////////////////////////////////////////////
    var treeViewObjects = {};

    PanelWin3js.editor.signals.clearObject3DTreeView.add(function () {
        console.log('in panel-ui-treeview.js: process clearObject3DTreeView', treeViewObjects);

        // clear the cache
        for (var objectUuid in treeViewObjects) {
            console.log('in panel-ui-treeview.js: delete object3d', objectUuid, treeViewObjects[objectUuid]);
            var object3d = treeViewObjects[objectUuid];
            object3d.data.viewItem.detach();
            treeViewObjects[objectUuid] = undefined;
        }
    });

    PanelWin3js.editor.signals.updateObject3DTreeView.add(function (dataJSON) {
        // create treeViewObjects[] object if needed
        if (treeViewObjects[dataJSON.uuid] === undefined) {
            console.log('in panel-ui-treeview.js: create a treeviewItem');
            var label = (dataJSON.name ? dataJSON.name : 'no name') + ' - ' + dataJSON.className;
            // create the dom element
            treeViewObjects[dataJSON.uuid] = {
                uuid:       dataJSON.uuid,
                parentUuid: dataJSON.parentUuid,
                data:       {
                    className: dataJSON.className,
                    viewItem:  new TreeViewItem(label, dataJSON.uuid)
                }
            }
        }

        var treeViewObject = treeViewObjects[dataJSON.uuid];
        console.assert(treeViewObject !== undefined);

        if (dataJSON.parentUuid) {
            console.log('in panel-ui-treeview.js: appendChild treeviewItem to parent', dataJSON.parentUuid);
            // add current object to the proper parent
            treeViewObjects[dataJSON.parentUuid].data.viewItem.appendChild(treeViewObject.data.viewItem);
            treeViewObject.parent = dataJSON.parentUuid;
        } else {
            console.log('in panel-ui-treeview.js: appendChild treeviewItem to root');
            // if this object got no parent, add it at the root
            // if( !object.data.viewItem.parentItem ){
            treeView.getRoot().appendChild(treeViewObject.data.viewItem);
            // }
        }

    });

    return container
};
