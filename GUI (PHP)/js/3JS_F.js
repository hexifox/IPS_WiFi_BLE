//Plotting Functions
//Beacons
function Plot_Beacons(size, posx, posy, posz, color, opacity, name){
    var geometry = new THREE.SphereGeometry(size, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial( { color: color } );
    sphere = new THREE.Mesh( geometry, material );
    sphere.material.transparent = true;
    sphere.material.opacity = opacity;
    scene.add( sphere );
    sphere.name = name;
    sphere.position.x = posx;
    sphere.position.y = posy;
    sphere.position.z = posz;
}
//Object
function Plot_Obj(size, posx, posy, posz){
    var geometry = new THREE.SphereGeometry(size, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    obj = new THREE.Mesh( geometry, material );
    scene.add( obj );
    obj.position.x = posx;
    obj.position.y = posy;
    obj.position.z = posz;
}

//Prev Object
function ThreeDim_Prev_Plot(PrevSize, PrevX, PrevY, PrevZ){
    var geometry = new THREE.SphereGeometry(PrevSize, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    prev = new THREE.Mesh( geometry, material );
    scene.add( prev );
    prev.position.x = PrevX;
    prev.position.y = PrevY;
    prev.position.z = PrevZ;
}
//Grids
function Plot_Grids(gx,gy,gz,s,d,rx,ry,rz){
    var g = new THREE.GridHelper( s, d );
    scene.add( g );
    g.position.x = gx;
    g.position.y = gy;
    g.position.z = gz;
    g.rotation.x += rx * (Math.PI/2);
    g.rotation.y += ry * (Math.PI/2);
    g.rotation.z += rz * (Math.PI/2);
}
//Lines
function ThreeDim_Lines (x0,x1,y0,y1){

}
//Camera Settings
function Cam_3(){
    scene.rotation.y = 3.5;
    camera.position.x = 6;
    camera.position.y = 5;
    camera.position.z = 6;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
}

//Text on Floors
function tf(text, w, h){
    // Canvas
    var canvas = document.createElement('canvas');
    cw = canvas.width = w * 100;
    ch = canvas.height = h * 100;

    var context = canvas.getContext('2d');
    context.translate( cw / 2, ch / 2 );
    context.rotate( 90*Math.PI / 180 );
    context.translate( -cw / 2, -ch / 2 );
    context.font = '30pt cicle';
    context.textAlign = "center";
    context.textBaseline = "middle";

    // draw background
    context.fillStyle = '#004c70';
    context.fillRect(-2500, -2500, 10000, 10000);

    context.fillStyle = "#b89e40";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    texture.anisotropy =  16;
    return texture;
}

//Floors
function Plot_Floors(w,h,d,x,y,z,room){    
    var geometry = new THREE.CubeGeometry(w,h,d);    
    var materials = [
        new THREE.MeshBasicMaterial({
            overdraw: true,
            color: '#5a5c61' }),
        new THREE.MeshBasicMaterial({
            overdraw: true,
            color: '#5a5c61' }),
        new THREE.MeshBasicMaterial({
            overdraw: true,
            map: tf(room, w, d)}),
        new THREE.MeshBasicMaterial({
            overdraw: true,
            color: '#5a5c61' }),
        new THREE.MeshBasicMaterial({
            overdraw: true,
            color: '#5a5c61' }),
        new THREE.MeshBasicMaterial( {
            overdraw: true,
            color: '#5a5c61' })
    ];
    cube = new THREE.Mesh( geometry , materials );
    cube.position.x = x+(w/2);
    cube.position.y = y+(h/2);
    cube.position.z = z+(d/2);
    scene.add( cube );
    var edges = new THREE.EdgesGeometry( geometry );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    cube.add( line );
}