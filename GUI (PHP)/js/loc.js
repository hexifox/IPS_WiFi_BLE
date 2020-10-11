function start(){
    OA0_OA1 = 0;
    OA0_OA2 = 0;
    OA0_OA3 = 0;
    //2D
    TwoDim_Init();
    TwoDim_Env();
    //3D
    ThreeDim_Init();
    ThreeDim_Env();
    //DATA GATHERING
    GetData();
    ThreeDim_Update(OA0_OA1,OA0_OA2,OA0_OA3);
    TwoDim_Update(OA0_OA1,OA0_OA2,OA0_OA3);

    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();
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
            hexData = (SepData[2] + '').split('//')[1].split(',');
            OA0 = hexData[0];
            OA0_OA1 = -hexData[1];
            OA0_OA2 = -hexData[2];
            OA0_OA3 = -hexData[3];
        }
    })
}

//UPDATE FUNCTION 2D/3D
function Update(){
    //DATA GATHERING
    GetData()
    //Update info bar
    document.getElementById('data_1').innerHTML = parseInt(OA0_OA1);
    document.getElementById('data_2').innerHTML = parseInt(OA0_OA2);
    document.getElementById('data_3').innerHTML = parseInt(OA0_OA3);
	//Update Functions
    ThreeDim_Update(OA0_OA1,OA0_OA2,OA0_OA3,1);
    TwoDim_Update(OA0_OA1,OA0_OA2,OA0_OA3,1,20);
    //Restart program every 't' intervals
    var Update_Restart = setTimeout(Update, 500);
}

//
//3D FUNCTIONS
//
function ThreeDim_Init(){
    posFactor = 56;
    plnFactor = 1;
    circles = [];
    //Three JS Definition
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x343434 );
    camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 100 );
    renderer = new THREE.WebGLRenderer();
    //Canvas Details
    canvs = document.getElementById('3DCanvas');
    renderer.setSize( canvs.clientWidth-10, canvs.clientHeight-20);
    canvs.appendChild( renderer.domElement );
}

function ThreeDim_Env(){
    //Plot the 5 grids (2/sides + 1 bottom)     
    ThreeDim_Grid(5,0,5,10,50,0,0,0);
    ThreeDim_Grid(7.5,2.5,10,5,25,1,0,0);
    ThreeDim_Grid(10,2.5,7.5,5,25,0,0,1);
    ThreeDim_Grid(2.5,2.5,10,5,25,1,0,0);
    ThreeDim_Grid(10,2.5,2.5,5,25,0,0,1);
    //Beacons Position And Plot
    //A
    ThreeDim_B1 = [];
    ThreeDim_B1.x = 8.6;
    ThreeDim_B1.z = 1;
    ThreeDim_B1.y = 9;
    ThreeDim_Beacon(0.1, ThreeDim_B1.x,ThreeDim_B1.z,ThreeDim_B1.y, 0x00ff00, 1, 'ThreeDim_B1');
    //B
    ThreeDim_B2 = [];
    ThreeDim_B2.x = 0.5;
    ThreeDim_B2.z = 1;
    ThreeDim_B2.y = 4;
    ThreeDim_Beacon(0.1, ThreeDim_B2.x,ThreeDim_B2.z,ThreeDim_B2.y, 0x00ff00, 1, 'ThreeDim_B2');
    //C
    ThreeDim_B3 = [];
    ThreeDim_B3.x = 8.5;
    ThreeDim_B3.z = 1;
    ThreeDim_B3.y = 1;
    ThreeDim_Beacon(0.1, ThreeDim_B3.x,ThreeDim_B3.z,ThreeDim_B3.y, 0x00ff00, 1, 'ThreeDim_B3');
    //Plot Object
    ThreeDim_Obj_Plot(0.2, 5, 1, 5);
    ThreeDim_Cam();
}

//Camera Settings
function ThreeDim_Cam(){
    scene.rotation.y = 3.5;
    camera.position.x = 6;
    camera.position.y = 5;
    camera.position.z = 6;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
}
//Plottibg Functions
//Beacons
function ThreeDim_Beacon(size, posx, posy, posz, color, opacity, name){
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
function ThreeDim_Obj_Plot(size, posx, posy, posz){
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
function ThreeDim_Grid(gx,gy,gz,s,d,rx,ry,rz){
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

function ThreeDim_Distance(rssi,PosFactor) {
    var ratio = (127 - rssi) / posFactor;
    var Dist = ((0.89976)*Math.pow(ratio , 7.7095))+ 0.111;
    return Dist;
} 

function ThreeDim_Update(OA0_OA1, OA0_OA2, OA0_OA3, PosFactor){

    ThreeDim_B1.distance = ThreeDim_Distance(OA0_OA1,PosFactor);
    ThreeDim_B2.distance = ThreeDim_Distance(OA0_OA2,PosFactor);
    ThreeDim_B3.distance = ThreeDim_Distance(OA0_OA3,PosFactor);
    
    document.getElementById('3D_dist_1').innerHTML = parseInt(ThreeDim_B1.distance);
    document.getElementById('3D_dist_2').innerHTML = parseInt(ThreeDim_B2.distance);
    document.getElementById('3D_dist_3').innerHTML = parseInt(ThreeDim_B3.distance);
   
    ThreeDim_Res = Gen_Trilateration(ThreeDim_B1,ThreeDim_B2,ThreeDim_B3);
   
    prevx = obj.position.x;
    prevy = obj.position.y;    
    prevz = obj.position.z;

    //ThreeDim_Prev_Plot(0.1,prevx,prevy,prevz)
    
    obj.position.x = (prevx + ThreeDim_Res.x)/2;    
    obj.position.y = 1;   
    obj.position.z = (prevz + ThreeDim_Res.y)/2;    

    document.getElementById('3d_data_point_x').innerHTML = parseInt(obj.position.x);
    document.getElementById('3d_data_point_y').innerHTML = parseInt(obj.position.z);
}


//
//2D FUNCTIONS
//
function TwoDim_Init(){
	//BOARD (CANVAS) INITIALISATION
	board = document.getElementById("2DCanvas");
	board.main = parent.innerWidth;
	board.main = parent.innerHeight;
	ctx = board.getContext("2d");
    //Beacons Init
    TwoDim_B1 = [];
    TwoDim_B2 = [];
    TwoDim_B3 = [];
    TwoDim_B1.x = 101;
    TwoDim_B1.y = 100;
    TwoDim_B1.distance = 0;
    TwoDim_B2.x = 801;
    TwoDim_B2.y = 600;
    TwoDim_B2.distance = 0;
    TwoDim_B3.x = 100;
    TwoDim_B3.y = 800;
    TwoDim_B3.distance = 0;
}

function TwoDim_ReInit(){
	//BOARD (CANVAS) RETRIEVAL
	board = document.getElementById("2DCanvas");
	ctx = board.getContext("2d");
	ctx.clearRect(0, 0, board.width, board.height);
}

function TwoDim_Env(){
	TwoDim_Grid(500,500,20,10,1000,1600);
	TwoDim_Beacons(TwoDim_B1,TwoDim_B2,TwoDim_B3,15);
}
// Grid Plot
function TwoDim_Grid(x,y,dens1,dens2,lenx,leny){
    for (a = 0; a < x; a++){
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = "#004870";
        ctx.moveTo(a*dens1, 0);
        ctx.lineTo(a*dens1, lenx);
        ctx.stroke();
    }
    for (a = 0; a < y; a+=2){
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = "#004870";
        ctx.moveTo(0, a*dens2);
        ctx.lineTo(leny, a*dens2);
        ctx.stroke();
    }
}
// Beacons Plot
function TwoDim_Beacons(B1,B2,B3,rad){
    //Beacons Params
    ctx.strokeStyle = "#B89E40";
    ctx.lineWidth = 2;
    //Plot beacon 1
    ctx.beginPath();
    ctx.arc(B1.x,B1.y,rad,0,2*Math.PI);
    ctx.stroke();
    //Plot beacon 2
    ctx.beginPath();
    ctx.arc(B2.x,B2.y,rad,0,2*Math.PI);
    ctx.stroke();
    //Plot beacon 3
    ctx.beginPath();
    ctx.arc(B3.x,B3.y,rad,0,2*Math.PI);
    ctx.stroke();
    //Circles Params
    ctx.strokeStyle = "#004870";
    ctx.lineWidth = 2;
    //Plot circle 1
    ctx.beginPath();
    ctx.arc(B1.x,B1.y,B1.distance,0,2*Math.PI);
    ctx.stroke();
    //Plot circle 2
    ctx.beginPath();
    ctx.arc(B2.x,B2.y,B2.distance,0,2*Math.PI);
    ctx.stroke();
    //Plot circle 3
    ctx.beginPath();
    ctx.arc(B3.x,B3.y,B3.distance,0,2*Math.PI);
    ctx.stroke();
}
//
//Convert Data & Plot Object
//
function TwoDim_Update(OA0_OA1, OA0_OA2, OA0_OA3, PosFactor, Radius){

    TwoDim_ReInit();
	TwoDim_B1.distance = (-20 * OA0_OA1 + 2200);
    TwoDim_B1.distance = TwoDim_B1.distance < 0 ? 0 : TwoDim_B1.distance;
	TwoDim_B2.distance = (-20 * OA0_OA2 + 2200);
    TwoDim_B2.distance = TwoDim_B2.distance < 0 ? 0 : TwoDim_B2.distance;
	TwoDim_B3.distance = (-20 * OA0_OA3 + 2200);
    TwoDim_B3.distance = TwoDim_B3.distance < 0 ? 0 : TwoDim_B3.distance;

    document.getElementById('2D_dist_1').innerHTML = parseInt(TwoDim_B1.distance);
    document.getElementById('2D_dist_2').innerHTML = parseInt(TwoDim_B2.distance);
    document.getElementById('2D_dist_3').innerHTML = parseInt(TwoDim_B3.distance);
    
    TwoDim_Res = Gen_Trilateration(TwoDim_B1,TwoDim_B2,TwoDim_B3);
	//redPos = kalmanFilter(prevX,prevY);
	X = TwoDim_Res.x;
	Y = TwoDim_Res.y;
	document.getElementById("2d_data_point_x").innerHTML=parseInt(X);
	document.getElementById("2d_data_point_y").innerHTML=parseInt(Y);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#2288E2";
    ctx.beginPath();
	ctx.arc(X,Y,Radius,0,2*Math.PI);
    ctx.stroke();
	TwoDim_Env();
}

function Gen_Trilateration(position1, position2, position3) {
    var xa = position1.x;
    var ya = position1.y;
    var xb = position2.x;
    var yb = position2.y;
    var xc = position3.x;
    var yc = position3.y;
    var ra = position1.distance;
    var rb = position2.distance;
    var rc = position3.distance;
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