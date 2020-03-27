/**
 * @author shaneski 2018/04/20
 */
THREE.ShaneTerrainLoader = function( url, callback, error ){
    var img = new Image();
    img.onload = function(){
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        var data = [];
        for(var x = 0; x < img.width; x++){
            for(var y = 0; y < img.height; y++){
                var pixeldata = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
                var gs = 0.21*pixeldata[0] + 0.72*pixeldata[1] + 0.007*pixeldata[2];
                data.push(gs);
            }
        }
        if(callback) callback({
            file:url,
            width:img.width,
            height:img.height,
            data:data
        });
    }
    img.onerror = function(){
        if(error) error({message:"Error loading image."});
    }
    img.src = url;
}

THREE.ShaneTerrainObject = function( parameters ){
    var url = parameters.file;
    var scale = parameters.scale;
    var width = parameters.width;
    var height = parameters.height;
    var amplitude = parameters.amplitude;
    var data = parameters.data;
    var color = parameters.color;

    var texture = new THREE.TextureLoader().load(url);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );

    var material = new THREE.MeshLambertMaterial({ color:color, map:texture });
    var geometry = new THREE.PlaneGeometry(scale*width,scale*height,(width - 1), (height - 1));

    var n = 0;
    for (var x = 0; x < width; x++){
        for (var y = 0; y < height; y++ ){
            geometry.vertices[n].z = amplitude*(data[n]/255);
            n++;
        }
    }

    var mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x += -1*90*Math.PI/180;
    return mesh;
};
