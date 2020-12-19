define([
  "esri/widgets/Expand",
  "esri/widgets/Daylight",

], 
function (
  Expand,
  Daylight,
) 
{
  function createWidget(view) {
    return new Daylight({
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