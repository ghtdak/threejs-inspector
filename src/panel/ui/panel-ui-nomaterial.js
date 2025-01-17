var PanelWin3js = PanelWin3js || {};

/**
 * Handle panel for object3d
 *
 * @constructor
 */
PanelWin3js.PanelNoMaterial = function () {
    var editor = PanelWin3js.editor;
    var signals = editor.signals;

    var container = new UI.Panel();
    container.dom.style.textAlign = 'center';

    //////////////////////////////////////////////////////////////////////////////////
    //		Comments
    //////////////////////////////////////////////////////////////////////////////////
    signals.object3dSelected.add(function (object3d) {
        var noMaterial = object3d === null || object3d.material === undefined;
        if (noMaterial) {
            container.setDisplay('inherit');
            return
        }

        container.setDisplay('none');
    });

    //////////////////////////////////////////////////////////////////////////////////
    //		Comments
    //////////////////////////////////////////////////////////////////////////////////
    var text = new UI.Text().setColor('#ccc').setValue('NO MATERIAL');
    text.dom.style.fontSize = '2em';
    text.dom.style.paddingTop = '1em';
    text.dom.style.width = '100%';
    container.add(text);

    return container
};
