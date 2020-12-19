define([
  "esri/widgets/Expand",
  "esri/widgets/LineOfSight",
  "esri/Graphic",
  "esri/core/watchUtils"
], 
function (
  Expand,
  LineOfSight,
  Graphic,
  watchUtils
) 
{
  const intersectionSymbol = {
    type: "point-3d",
    symbolLayers: [
      {
        type: "object",
        resource: { primitive: "inverted-cone" },
        material: { color: [255, 100, 100] },
        height: 10,
        depth: 10,
        width: 10,
        anchor: "relative",
        anchorPosition: { x: 0, y: 0, z: -0.7 }
      }
    ]
  };

  function setIntersectionMarkers(view, viewModel) {
    view.graphics.removeAll();
    viewModel.targets.forEach(function (target) {
      if (target.intersectedLocation) {
        const graphic = new Graphic({
          symbol: intersectionSymbol,
          geometry: target.intersectedLocation
        });
        view.graphics.add(graphic);
      }
    });
  }

  function createWidget(view) {
    return new LineOfSight({
      view: view,
      container: "losWidget"
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
      const lineOfSight = createWidget(view);
      const viewModel = lineOfSight.viewModel;
      addToUI(view, document.getElementById('losDiv'));
      
      // watch when observer location changes
      viewModel.watch("observer", function (value) {
        setIntersectionMarkers(view, viewModel);
      });

      // watch when a new target is added or removed
      viewModel.targets.on("change", function (event) {
        event.added.forEach(function (target) {
          setIntersectionMarkers(view, viewModel);
          // for each target watch when the intersection changes
          target.watch("intersectedLocation", () => setIntersectionMarkers(view, viewModel));
        });
      });

      viewModel.start();
  
      watchUtils.whenEqualOnce(viewModel, "state", "creating", 
      (value) => {viewModel.stop();});       
    }
  }
})











