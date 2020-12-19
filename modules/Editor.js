define([
  "esri/widgets/Expand",
  "esri/widgets/Editor",

], 
function (
  Expand,
  Editor,
) 
{
  function createWidget(view) {
    return new Editor({
      view: view
    });
  }
  
  function addToUI(view, element) {
    let expand = new Expand({
      view: view,
      content: element
    })

    view.ui.add(expand, 'top-right');
  }

  return {
    addWidget: (view) => {
      const widget = createWidget(view);
      addToUI(view, widget);
    }
  }
})