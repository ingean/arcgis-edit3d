define([
  "esri/widgets/Expand",
  "esri/widgets/ElevationProfile",

], 
function (
  Expand,
  ElevationProfile,
) 
{
  function createWidget(view) {
    return new ElevationProfile({
      view: view,
      profiles: [
        { type: "ground" },
        { type: "view"}
      ]
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