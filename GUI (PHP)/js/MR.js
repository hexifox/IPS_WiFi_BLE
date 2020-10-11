var Start_showPage;
var Start_main;
function load() {
    Start_showPage = setTimeout(showPage, 3000);
    Start_showPage = setTimeout(start, 5000);
}
function showPage() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("Loading_Image").style.display = "none";
    var elems = document.getElementsByClassName('row');
    for (var i=0;i<elems.length;i+=1){
        elems[i].style.display = 'block';
    }
}

function start(){

    SepData = [];
    DevData=0;
    Dev1 = [];
    Dev2 = [];
    Dev3 = [];
    Dev1_Data = 0;
    Dev2_Data = 0;
    Dev3_Data = 0
    prevx = 0;
    prevy = 0;    
    prevz = 0;
    //DATA GATHERING
    GetData();
    gs();
    //3D
    Ini();
    Env();
    Upd();
    animate();
    setTimeout(Update(), 2000);
}

//DATA GATHERING
function GetData(){
    $.ajax({
        url: "./require/getData.php", 
        type: 'GET',
        success: function(Data) {
            //Prepare Data for extraction
            SepData = Data.toString().split(';<br>');
            //Split data for each beacons/receivers
            Dev1_Data = (SepData[1] + '').split('//')[1].split(',');
            Dev2_Data = (SepData[2] + '').split('//')[1].split(',');
            Dev3_Data = (SepData[3] + '').split('//')[1].split(',');
            DevData = [Dev1_Data,Dev2_Data,Dev3_Data];
        }
    })
}
//STATUS INFO
function gs(){
    $.ajax({
        url: "./require/ConfData.php", 
        type: 'GET',
        success: function(de) {
            //Prepare Data for extraction
            st = de.toString().split(';<br>');
            //Split data for each beacons/receivers
            hs = (st[1] + '').split('/');
            S_Name = parseInt(hs[0]);
            S_Iter = parseInt(hs[1]);
            S_Numb = parseInt(hs[2]);
            S_Stat = parseInt(hs[3]);
            ScanCheck(S_Stat);
        }
    })
}
function ParseInfoDev(nu, da){
    for(xj = 1; xj <= 4; xj++){
        var div = nu + "_" + xj;
        document.getElementById(div).innerHTML = parseInt(da[xj]);
    }
}

//UPDATE FUNCTION
function Update(){
    //DATA GATHERING
    GetData();
    gs();
    //Parse Info
    // ParseInfoDev("Dev1", Dev1_Data);
    // ParseInfoDev("Dev2", Dev2_Data);
    // ParseInfoDev("Dev3", Dev3_Data);
	//Update Functions
    Upd(Dev1_Data, Dev2_Data, Dev3_Data,1);
    //Restart program every 't' intervals
    var Update_Restart = setTimeout(Update, 500);
}

function ScanCheck(status){
	if(status==0){
		var scanDiv = document.getElementById('ScanID');
		scanDiv.value = 'OFF';
		scanDiv.style.backgroundColor = 'rgb(0,76,112)';
	}
	if(status==1){
		var scanDiv = document.getElementById('ScanID');
		scanDiv.value = 'ON';
		scanDiv.style.backgroundColor = '#28a03b';
	}
}
//
//3D FUNCTIONS
//
function Ini(){
    posFactor = 56;
    plnFactor = 1;
    circles = [];
    d1_kf = [];
    d2_kf = [];
    d3_kf = [];
    //Kalman Filters
    for(ww = 0; ww < 5; ww++){
        d1_kf[ww] = new KalmanFilter({R: 0.01, Q: 20, B: 2});
        d2_kf[ww] = new KalmanFilter({R: 0.01, Q: 20, B: 2});
        d3_kf[ww] = new KalmanFilter({R: 0.01, Q: 20, B: 2});
    }

    container = document.getElementById( '3DCanvas' );

    SCREEN_WIDTH = container.clientWidth - 20;
    SCREEN_HEIGHT = container.clientHeight -20;

    // CAMERA
    camera = new THREE.PerspectiveCamera( 40, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
    camera.position.set( 0, 0, 0 );
    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x343434 );
    // CONTROLS
    var controls = new THREE.OrbitControls( camera );
    controls.maxPolarAngle = 0.9 * Math.PI / 2;
    controls.enableZoom = false;
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.left = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
    // LIGHTS
    var light = new THREE.DirectionalLight( 0xaabbff, 0.3 );
    light.position.x = 300;
    light.position.y = 250;
    light.position.z = -500;
    scene.add( light );
    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    container.appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

function Env(){
    pf = -60;


    di = [];
    dr = [];

    pos_a = "close";
    pos_b = "near";
    pos_c = "far";
    pos_d = "out"

    office_plan_x = [];
    office_plan_y = [];
    office_plan_z = [];
    office_plan_room = [];
    //Plot the 5 grids (2/sides + 1 bottom)     
    Plot_Floors(0, 3.5,0.5,4.3,0,0,0,"Development");         //Dev
    Plot_Floors(1, 3.5,0.5,3.8,0,0,4.3, "Kitchen");       //Kitchen
    Plot_Floors(2, 3.5,0.5,6.3,0,0,8.1, "Boardroom");       //Boardroom
    Plot_Floors(3, 3.5,0.5,6.0,0,0,14.4, "WC");      //WC
    Plot_Floors(4, 3.3,0.5,2.6,3.5,0,1.7, "Staircase");     //Staircase
    Plot_Floors(5, 1.6,0.5,12.7,3.5,0,4.3, "Corridor");    //Corridor
    Plot_Floors(6, 1.6,0.5,2.5,3.5,0,17, "Stairs");      //Emergency Stairs
    Plot_Floors(7, 4,0.5,3.2,5.1,0,4.3, "Finances");       //Finances
    Plot_Floors(8, 4,0.5,3.0,5.1,0,7.5, "Engineers");       //Engineers
    Plot_Floors(9, 4,0.5,9.0,5.1,0,10.5, "Operations");      //Operations

    //Beacons Position And Plot
    //A
    B1 = [];
    B1.x = 3;
    B1.z = 0.5;
    B1.y = 4;
    Bea_3(0.1, B1.x,B1.z,B1.y, 0xb89e40, 1, 'B1');
    //B
    B2 = [];
    B2.x = 5.5;
    B2.z = 0.5;
    B2.y = 14;
    Bea_3(0.1, B2.x,B2.z,B2.y, 0xb89e40, 1, 'B2');
    //C
    B3 = [];
    B3.x = 0.2;
    B3.z = 0.5;
    B3.y = 10;
    Bea_3(0.1, B3.x,B3.z,B3.y, 0xb89e40, 1, 'B3');
    //D
    B4 = [];
    B4.x = 8.5;
    B4.z = 0.5;
    B4.y = 7;
    Bea_3(0.1, B4.x,B4.z,B4.y, 0xb89e40, 1, 'B3');
    //Plot Object
    Dev1_Plot(0.2, 5, 1, 5);
    Dev2_Plot(0.2, 5, 1, 5);
    Dev3_Plot(0.2, 5, 1, 5);

    Cam_3();
}
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

function mapping(v1,v2,v3,v4){
    pos = 100;
    if(v1 == pos_a && v3 == pos_b){
        pos = 0;
    }else if(v1 == pos_a){
        pos = 0;
    }else if(v2 == pos_a){
        pos = 7;
    }else if(v3 == pos_a){
        pos = 2;
    }else if(v4 == pos_a){
        pos = 7;
    }else if(v2 == pos_a && v3 == pos_b){
        pos = 0;
    }else if(v1 == pos_d && v2 == pos_d && v3 == pos_a  && v2 == pos_d){
        pos = 0;
    }else if(v1 == pos_d && v2 == pos_d && v4 == pos_d){
        pos = 2;
    }else if(v1 == pos_c && v2 == pos_d && v4 == pos_d){
        pos = 2;
    }else if(v1 == pos_d && v2 == pos_c && v4 == pos_d){
        pos = 2;
    }else if(v1 == pos_d && v2 == pos_d && v4 == pos_c){
        pos = 2;
    }else if(v1 == pos_c && v2 == pos_c && v4 == pos_d){
        pos = 2;
    }else if(v1 == pos_d && v2 == pos_c && v4 == pos_c){
        pos = 2;
    }else if(v1 == pos_c && v2 == pos_c && v4 == pos_c){
        pos = 2;
    }else if(v1 == pos_d && v2 == pos_d && v3 == pos_b  && v2 == pos_d){
        pos = 2;
    }else if(v2 == pos_b && v3 == pos_b){
        pos = 5;
    }else if(v1 == pos_a && v4 == pos_b){
        pos = 4;
    }else if(v1 == pos_a && v2 == pos_a && v3 == pos_a && v4 == pos_a){
        pos = 5;
    }else if(v1 == pos_a && v3 == pos_a){
        pos = 1;
    }else if(v1 == pos_a){
        pos = 0;
    }else if(v2 == pos_a){
        pos = 7;
    }else if(v3 == pos_a){
        pos = 2;
    }else if(v4 == pos_a){
        pos = 7;
    }
    return pos;
}

//Floors
function Plot_Floors(id, w,h,d,x,y,z,room){   
    office_plan_room[id] = room; 
    office_plan_x[id] = w+x;
    office_plan_y[id] = h+y;
    office_plan_z[id] = d+z;
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
    cube.name = room;
    scene.add( cube );
    var edges = new THREE.EdgesGeometry( geometry );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    cube.add( line );
}

//Camera Settings
function Cam_3(){
    camera.position.x = -5;
    camera.position.y = 8;
    camera.position.z = 15;
    scene.rotation.y += 1.1;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
}
//Plotting Functions
//Beacons
function Bea_3(size, posx, posy, posz, color, opacity, name){
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
function Dev1_Plot(size, posx, posy, posz){
    var geometry = new THREE.SphereGeometry(size, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    dev1_obj = new THREE.Mesh( geometry, material );
    scene.add( dev1_obj );
    dev1_obj.position.x = posx;
    dev1_obj.position.y = posy;
    dev1_obj.position.z = posz;
    document.getElementById('Dev1_11').innerHTML = "Red"
    
}
//Object
function Dev2_Plot(size, posx, posy, posz){
    var geometry = new THREE.SphereGeometry(size, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    dev2_obj = new THREE.Mesh( geometry, material );
    scene.add( dev2_obj );
    dev2_obj.position.x = posx;
    dev2_obj.position.y = posy;
    dev2_obj.position.z = posz;
    document.getElementById('Dev2_11').innerHTML = "Green";
}
//Object
function Dev3_Plot(size, posx, posy, posz){
    var geometry = new THREE.SphereGeometry(size, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    dev3_obj = new THREE.Mesh( geometry, material );
    scene.add( dev3_obj );
    dev3_obj.position.x = posx;
    dev3_obj.position.y = posy;
    dev3_obj.position.z = posz;
    document.getElementById('Dev3_11').innerHTML = "Blue";
}
//Prev Object
function Prev_Plot(PrevSize, PrevX, PrevY, PrevZ){
    var geometry = new THREE.SphereGeometry(PrevSize, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    prev = new THREE.Mesh( geometry, material );
    scene.add( prev );
    prev.position.x = PrevX;
    prev.position.y = PrevY;
    prev.position.z = PrevZ;
}

function Distance(rssi) {
    var ratio = rssi / pf;
    var Dist = ((0.89976)*Math.pow(ratio , 7.7095))+ 0.111;
    if(Dist < 5){
        p = pos_a;
    }else if(Dist < 10){
        p = pos_b;
    }else if(Dist < 20){
        p = pos_c;
    }else{
        p = pos_d;
    }
    return [p, Dist];
} 

function BClo(ar, nu){
    if(nu == 1){
        for(ww = 1; ww < 5; ww++){
            di[ww-1] = Distance(d1_kf[ww].filter(ar[ww]));
        }
    }else if(nu == 2){
        for(ww = 1; ww < 5; ww++){
            di[ww-1] = Distance(d2_kf[ww].filter(ar[ww]));
        }
    }else if(nu == 3){
        for(ww = 1; ww < 5; ww++){
            di[ww-1] = Distance(d3_kf[ww].filter(ar[ww]));
        }
    }

    for(var xj = 1; xj <= 4; xj++){
        de = "Dev" + nu + "_" + (xj + 4);
        document.getElementById(de).innerHTML = di[xj-1][0];
    }

    dt = mapping(di[0][0],di[1][0],di[2][0],di[3][0]);
    dr[nu] = [di[0][1],di[1][1],di[2][1],di[3][1]];
    
    if(dt == 100){
        re = [];
        re.x = -1 - nu/4;
        re.y = -1;
        re.r = "Out of bounds !";
    }else{
        ro = scene.getObjectByName( office_plan_room[dt], true );    
        
        re = [];
        re.x = ro.position.x;
        re.y = ro.position.z + nu/4;
        re.r = ro.name;
    }

    de = "Dev" + nu + "_12";
    document.getElementById(de).innerHTML = re.r;
    return re;
}

function Upd(Dev1, Dev2, Dev3, p){

    Dev1 = Dev1_Data;
    Dev2 = Dev2_Data;
    Dev3 = Dev3_Data;

    D1 = BClo(Dev1_Data, 1);
    dev1_obj.position.x = D1.x;
    dev1_obj.position.y = 1;
    dev1_obj.position.z = D1.y;
    D2 = BClo(Dev2_Data, 2);
    dev2_obj.position.x = D2.x;
    dev2_obj.position.y = 1;
    dev2_obj.position.z = D2.y;
    D3 = BClo(Dev3_Data, 3);
    dev3_obj.position.x = D3.x;
    dev3_obj.position.y = 1;
    dev3_obj.position.z = D3.y;
}

function gT(p1, p2, p3) {
    var xa = p1.x;
    var ya = p1.y;
    var xb = p2.x;
    var yb = p2.y;
    var xc = p3.x;
    var yc = p3.y;
    var ra = p1.di;
    var rb = p2.di;
    var rc = p3.di;
    if(ra < 1){
        x = xa;
        y = ya;
    }else if(rb < 1){
        x = xb;
        y = yb;
    }else if(rc < 1){
        x = xc;
        y = yc;
    }else{
        var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
        var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
        var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
        var x = ((y * (ya - yb)) - T) / (xb - xa);
    }
    return {
        x: x,
        y: y
    };
}

function g_Tri(r,b) {
    switch(b) {
        case 0:
            var xa = B2.x;
            var ya = B2.y;
            var xb = B3.x;
            var yb = B3.y;
            var xc = B4.x;
            var yc = B4.y;
            break;
        case 1:
            var xa = B1.x;
            var ya = B1.y;
            var xb = B3.x;
            var yb = B3.y;
            var xc = B4.x;
            var yc = B4.y;
            break;
        case 2:
            var xa = B1.x;
            var ya = B1.y;
            var xb = B2.x;
            var yb = B2.y;
            var xc = B4.x;
            var yc = B4.y;
            break;
        case 3:
            var xa = B1.x;
            var ya = B1.y;
            var xb = B2.x;
            var yb = B2.y;
            var xc = B3.x;
            var yc = B3.y;
            break;
    }
    var ra = r[0];
    var rb = r[1];
    var rc = r[2];
    if(ra < 1){
        x = xa;
        y = ya;
    }else if(rb < 1){
        x = xb;
        y = yb;
    }else if(rc < 1){
        x = xc;
        y = yc;
    }else{
        var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
        var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
        var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
        var x = ((y * (ya - yb)) - T) / (xb - xa);
    }
    return {
        x: x,
        y: y
    };
}