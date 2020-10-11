var Start_showPage;
var Start_main;

Fre = [];
Fre.x = 250;
Fre.y = 250;

Prv_2 = [];
Prv_2.x = 100;
Prv_2.y = 100;

Ref_2 = [];
Ref_2.x = 100;
Ref_2.y = 100;

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
    Rad_2 = 20;
    Ini_2();
    //Ini_3();
    Env_2();
    //Env_3();
    //DATA GATHERING
    Ini_G();
    Upd_2();
    //Upd_3();

    //animate();
    setTimeout(Upd(), 2000);
}
//Init Function
function Ini_G(){


    pf = - 57;
    pl = - 57;
    cs = [];
    th_2 = 25;
    th_3 = 0.8;
    Res_2_1 = [];
    Res_3_1 = [];

    // Res_2_kf_x = new KalmanFilter({R: 0.01, Q: 20, B: 2});
    // Res_2_kf_y = new KalmanFilter({R: 0.01, Q: 20, B: 2});
    // Res_3_kf_x = new KalmanFilter({R: 0.01, Q: 20, B: 2});
    // Res_3_kf_y = new KalmanFilter({R: 0.01, Q: 20, B: 2});
    Res_2_kf_x = 0;
    Res_2_kf_y = 0;
    Res_3_kf_x = 0;
    Res_3_kf_y = 0;

    $.ajax({
        url: "./require/DR_Data.php", 
        type: 'GET',
        success: function(dt) {
            //Prepare Data for extraction
            sd = dt.toString().split(';<br>');
            //Split data for each beacons/receivers
            hd = (sd[0] + '').split('//')[1].split(',');
            //Kalman Filters
            //D5
            d5 = parseFloat(hd[0]);
            d5_kf = new KalmanFilter({R: 0.01, Q: 20, B: 2});
            d5_kf.filter(d5);
            //D6
            d6 = parseFloat(hd[1]);
            d6_kf = new KalmanFilter({R: 0.01, Q: 20, B: 2});
            d6_kf.filter(d6);
            //D7
            d7 = parseFloat(hd[2]);
            d7_kf = new KalmanFilter({R: 0.01, Q: 20, B: 2});
            d7_kf.filter(d7);
            //D8
            d8 = parseFloat(hd[3]);
            d8_kf = new KalmanFilter({R: 0.01, Q: 20, B: 2});
            d8_kf.filter(d8);
        }
    })
}
//DATA GATHERING
function da(){
    $.ajax({
        url: "./require/DR_Data.php", 
        type: 'GET',
        success: function(dt) {
            //Prepare Data for extraction
            sd = dt.toString().split(';<br>');
            //Split data for each beacons/receivers
            hd = (sd[0] + '').split('//')[1].split(',');
            d5_raw = parseFloat(hd[0]);
            d5 = d5_kf.filter(d5_raw);
            d6_raw = parseFloat(hd[1]);
            d6 = d6_kf.filter(d6_raw);
            d7_raw = parseFloat(hd[2]);
            d7 = d7_kf.filter(d7_raw);
            d8_raw = parseFloat(hd[3]);
            d8 = d8_kf.filter(d8_raw);
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
            hs = (st[0] + '').split('/');
            S_Name = parseInt(hs[0]);
            S_Iter = parseInt(hs[1]);
            S_Numb = parseInt(hs[2]);
            S_Stat = parseInt(hs[3]);
            ScanCheck(S_Stat);
        }
    })
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
//UPDATE FUNCTION 2D/3D
function Upd(){
    //DATA GATHERING
    da();
    gs();
    //Update info bar
    document.getElementById('d5').innerHTML = parseInt(d5);
    document.getElementById('d6').innerHTML = parseInt(d6);
    document.getElementById('d7').innerHTML = parseInt(d7);
    document.getElementById('d8').innerHTML = parseInt(d8);
	//Update Functions
    Upd_2();
    //Upd_3();
    var ur = setTimeout(Upd, 100);
}
//
//3D FUNCTIONS
//
function Ini_3(){
    //Three JS
    container = document.getElementById( 'Can_3' );
    SCREEN_WIDTH = container.clientWidth - 10;
    SCREEN_HEIGHT = container.clientHeight -10;
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
//Environment For 3 Dim
function Env_3(){
    //Dev
    
    Plot_Floors(3.5,0.5,4.3,0,0,0,"Development");         
    //Beacons Position And Plot
    //5
    B5 = [];
    B5.x = 0.1;
    B5.z = 1;
    B5.y = 3.5;
    B5.di = 0;
    Plot_Beacons(0.1, B5.x,B5.z,B5.y, 0x00ff00, 1, 'B5');
    //6
    B6 = [];
    B6.x = 3.2;
    B6.z = 1;
    B6.y = 0.6;
    B6.di = 0;
    Plot_Beacons(0.1, B6.x,B6.z,B6.y, 0x00ff00, 1, 'B6');
    //7
    B7 = [];
    B7.x = 3.2;
    B7.z = 1;
    B7.y = 3.5;
    B7.di = 0;
    Plot_Beacons(0.1, B7.x,B7.z,B7.y, 0x00ff00, 1, 'B7');
    //8
    B8 = [];
    B8.x = 0.1;
    B8.z = 1;
    B8.y = 0.8;
    B8.di = 0;
    Plot_Beacons(0.1, B8.x,B8.z,B8.y, 0x00ff00, 1, 'B8');
    //Plot Object
    Plot_Obj(0.2, 5, 1, 5);

    Ref_3 = [];
    Ref_3.x = 0;
    Ref_3.y = 0;

    Cam_3();
}

//Distance For 3 Dim
function Dst_3(rssi,pf) {
    var ratio = rssi / pf;
    var Dist = ((0.89976)*Math.pow(ratio , 7.7095))+ 0.111;
    return Dist;
} 

//Update For 3 Dim
function Upd_3(){

    B5.di = Dst_3(d5, pf);
    B6.di = Dst_3(d6, pf);
    B7.di = Dst_3(d7, pf);
    B8.di = Dst_3(d8, pf);

    dis_3 = [B5.di, B6.di, B7.di, B8.di];
    dis_3_s = Math.max.apply(Math, dis_3);
    
    document.getElementById('d_3_1').innerHTML = parseInt(B5.di);
    document.getElementById('d_3_2').innerHTML = parseInt(B6.di);
    document.getElementById('d_3_3').innerHTML = parseInt(B7.di);
    document.getElementById('d_3_4').innerHTML = parseInt(B8.di);
    
    if(B5.di < th_3){
        Res_3_1.x = B5.x;
        Res_3_1.y = B5.y;
    }else if(B6.di < th_3){
        Res_3_1.x = B6.x;
        Res_3_1.y = B6.y;
    }else if(B7.di < th_3){
        Res_3_1.x = B7.x;
        Res_3_1.y = B7.y;
    }else if(B8.di < th_3){
        Res_3_1.x = B8.x;
        Res_3_1.y = B8.y;
    }else if(dis_3_s == B5.di){
        Res_3_1 = gT(B6,B7,B8);
    }else if(dis_3_s == B6.di){
        Res_3_1 = gT(B5,B7,B8);
    }else if(dis_3_s == B7.di){
        Res_3_1 = gT(B5,B6,B8);
    }else if(dis_3_s == B8.di){
        Res_3_1 = gT(B5,B6,B7);
    }
    
    R_3_x = Res_3_1.x;
    R_3_y = Res_3_1.y;

    obj.position.x = R_3_x;    
    obj.position.y = 1;   
    obj.position.z = R_3_y;


    document.getElementById('p_3_x').innerHTML = parseInt(R_3_x);
    document.getElementById('p_3_y').innerHTML = parseInt(R_3_y);
}

//
//2D FUNCTIONS
//
function Ini_2(){
	//BOARD (CANVAS) INITIALISATION
    bo = document.getElementById("Can_2");
    bo.width = bo.offsetWidth;
    bo.height = bo.offsetHeight;
    ctx = bo.getContext("2d");

    Rad_2D = 50;
    //Beacons Init

    B5_2 = [];
    B5_2.x = 340;
    B5_2.y = 80;
    B5_2.di = 0;

    B6_2 = [];
    B6_2.x = 40;
    B6_2.y = 370;
    B6_2.di = 0;

    B7_2 = [];
    B7_2.x = 20;
    B7_2.y = 80;
    B7_2.di = 0;

    B8_2 = [];
    B8_2.x = 340;
    B8_2.y = 370;
    B8_2.di = 0;

    Ref_2 = [];
    Ref_2.x = 0;
    Ref_2.y = 0;

}

function Rin_2(){
	//BOARD (CANVAS) RETRIEVAL
	ctx.clearRect(0, 0, bo.width, bo.height);
}

function Env_2(){
	//Grid_2(350,430,20,10,350,430);
	Beas_2(B5_2,B6_2,B7_2,B8_2,15);
}
// Grid Plot
function Grid_2(x,y,dens1,dens2,lenx,leny){
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
function Beas_2(B5_2,B6_2,B7_2,B8_2,rad){
    //Beacons Params
    ctx.strokeStyle = "#B89E40";
    ctx.lineWidth = 2;

    //Plot beacon 5
    ctx.beginPath();
    ctx.arc(B5_2.x,B5_2.y,rad,0,2*Math.PI);
    ctx.stroke();
    //Plot beacon 6
    ctx.beginPath();
    ctx.arc(B6_2.x,B6_2.y,rad,0,2*Math.PI);
    ctx.stroke();
    //Plot beacon 7
    ctx.beginPath();
    ctx.arc(B7_2.x,B7_2.y,rad,0,2*Math.PI);
    ctx.stroke();
    //Plot beacon 8
    ctx.beginPath();
    ctx.arc(B8_2.x,B8_2.y,rad,0,2*Math.PI);
    ctx.stroke();

    //Circles Params
    ctx.strokeStyle = "#004870";
    ctx.lineWidth = 2;

    //Plot circle 1
    ctx.beginPath();
    ctx.arc(B5_2.x,B5_2.y,B5_2.di,0,2*Math.PI);
    ctx.stroke();
    //Plot circle 2
    ctx.beginPath();
    ctx.arc(B6_2.x,B6_2.y,B6_2.di,0,2*Math.PI);
    ctx.stroke();
    //Plot circle 3
    ctx.beginPath();
    ctx.arc(B7_2.x,B7_2.y,B7_2.di,0,2*Math.PI);
    ctx.stroke();
    //Plot circle 4
    ctx.beginPath();
    ctx.arc(B8_2.x,B8_2.y,B8_2.di,0,2*Math.PI);
    ctx.stroke();
}
//
//Convert Data & Plot Object
//

//Distance For 2 Dim
function Dst_2(rssi,pf, r) {
    var ratio = rssi / pf;
    var Dist = ((0.89976)*Math.pow(ratio , 7.7095))+ 0.111;
    return Dist*r;
} 

function Upd_2(){

    Rin_2();
	B5_2.di = Dst_2(d5, pl, Rad_2D);
    B5_2.di = B5_2.di < 0 ? 0 : B5_2.di;
	B6_2.di = Dst_2(d6, pl, Rad_2D);
    B6_2.di = B6_2.di < 0 ? 0 : B6_2.di;
	B7_2.di = Dst_2(d7, pl, Rad_2D);
    B7_2.di = B7_2.di < 0 ? 0 : B7_2.di;
	B8_2.di = Dst_2(d8, pl, Rad_2D);
    B8_2.di = B8_2.di < 0 ? 0 : B8_2.di;

    dis_2 = [B5_2.di, B6_2.di, B7_2.di, B8_2.di];
    dis_2_s = Math.max.apply(Math, dis_2);

    document.getElementById('d_2_1').innerHTML = parseInt(B5_2.di);
    document.getElementById('d_2_2').innerHTML = parseInt(B6_2.di);
    document.getElementById('d_2_3').innerHTML = parseInt(B7_2.di);
    document.getElementById('d_2_4').innerHTML = parseInt(B8_2.di);
    
    if(B5_2.di < th_2){
        Res_2_1.x = B5_2.x;
        Res_2_1.y = B5_2.y;
    }else if(B6_2.di < th_2){
        Res_2_1.x = B6_2.x;
        Res_2_1.y = B6_2.y;
    }else if(B7_2.di < th_2){
        Res_2_1.x = B7_2.x;
        Res_2_1.y = B7_2.y;
    }else if(B8_2.di < th_2){
        Res_2_1.x = B8_2.x;
        Res_2_1.y = B8_2.y;
    }else if(dis_2_s == B5_2.di){
        Res_2_1 = gT(B6_2,B7_2,B8_2);
    }else if(dis_2_s == B6_2.di){
        Res_2_1 = gT(B5_2,B7_2,B8_2);
    }else if(dis_2_s == B7_2.di){
        Res_2_1 = gT(B5_2,B6_2,B8_2);
    }else if(dis_2_s == B8_2.di){
        Res_2_1 = gT(B5_2,B6_2,B7_2);
    }

    R_2_x = Res_2_1.x;
    R_2_y = Res_2_1.y;

    checkRoom();
	document.getElementById("p_2_x").innerHTML=parseInt(R_2_x);
	document.getElementById("p_2_y").innerHTML=parseInt(R_2_y);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#2288E2";
    ctx.beginPath();
	ctx.arc(R_2_x,R_2_y,Rad_2,0,2*Math.PI);
    ctx.stroke();
	Env_2();
}

function checkRoom(){
    var areaDiv = document.getElementById('AreaID');
    if(-1 < R_2_x && R_2_x < 350 && -1 < R_2_y && R_2_y < 430){
		areaDiv.innerHTML = 'In the room: Dev';
        areaDiv.style.color = '#28a03b';
    }else{
		areaDiv.innerHTML = 'Out of Bounds';
        areaDiv.style.color = '#d83422';
    }
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