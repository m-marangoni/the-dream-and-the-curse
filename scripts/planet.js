//all three.js planet codes based on SuperHi tutorial about experimental javascript https://www.superhi.com/

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1)

const sectionTag = document.querySelector("section")
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.00010)

// add some lighting
const ambientLight = new THREE.AmbientLight(0x777777)
scene.add(ambientLight)

// add a spotlight
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(300, 300, -2000)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = -3000

// make a THREE.js loader
const loader = new THREE.TextureLoader()



// make planet 
const makePlanet = function () {
  const textureFront = loader.load("/src/world.png")
  const textureBack = loader.load("/src/back.png")

  var geometry1 = new THREE.PlaneGeometry( 900, 1400, 1, 1 );            
  var geometry2 = new THREE.PlaneGeometry( 900, 1400, 1, 1 );            
  geometry1.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );  
  geometry2.applyMatrix( new THREE.Matrix4().makeRotationY(  Math.PI ) );  

  var material1 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: textureFront, doubleSided: true } );
  var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: textureBack, doubleSided: true} );
 // card
 card = new THREE.Object3D();
 scene.add( card );
 
 // mesh
 var mesh1 = new THREE.Mesh( geometry1, material1);
 card.add( mesh1 );
 var mesh2 = new THREE.Mesh( geometry2, material2 );
 card.add( mesh2 );


 return mesh2
 
}



const makeStars = function (url, maxNum) {
  const texture = loader.load(url)
  const geometry = new THREE.Geometry()

  for (let i = 0; i < maxNum; i = i + 1) {
    const point = new THREE.Vector3()
    const sphericalPoint = new THREE.Spherical(
      1200 + Math.random() * 1200,
      2 * Math.PI * Math.random(),
      Math.PI * Math.random()
    )

    point.setFromSpherical(sphericalPoint)

    geometry.vertices.push(point)
  }

  const material = new THREE.PointsMaterial({
    size: 30,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false
  })

  const points = new THREE.Points(geometry, material)

  scene.add(points)

  return points
}




//make a moon
const makeMoon = function () {
  // const texture = loader.load("/src/moontexture.png")
  // const geometry = new THREE.SphereGeometry(100, 640, 640)
  // const material = new THREE.MeshLambertMaterial({
  //   map: texture  })
  // const mesh = new THREE.Mesh(geometry, material)

  // scene.add(mesh)
  // return mesh
  const textureFront = loader.load("/src/tower.png")
  const textureBack = loader.load("/src/back.png")

  var geometry1 = new THREE.PlaneGeometry( 900, 1400, 100, 100 );            
  var geometry2 = new THREE.PlaneGeometry( 900, 1400, 100, 100 ); 
  geometry1.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );             
  geometry2.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );  
  geometry1.translate(-1000, 40, 40);
  geometry2.translate(-1000, 40, 40)
  var material1 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: textureFront } );
  var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: textureBack } );
 // card
 card = new THREE.Object3D();
 scene.add( card );
 
 // mesh
 var mesh1 = new THREE.Mesh( geometry1, material1 );
 card.add( mesh1 );
 var mesh2 = new THREE.Mesh( geometry2, material2 );
 card.add( mesh2 );


 return  mesh2
}

//make a moon2
const makeMoonTwo = function () {
  
  const textureFront = loader.load("/src/fool.png")
  const textureBack = loader.load("/src/back.png")

  var geometry1 = new THREE.PlaneGeometry( 900, 1400, 100, 100 );            
  var geometry2 = new THREE.PlaneGeometry( 900, 1400, 100, 100 );   
  geometry1.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );           
  geometry2.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );  
  geometry1.translate(1000, 40, 40);
  geometry2.translate(1000, 40, 40)
  var material1 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: textureFront } );
  var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: textureBack } );
 // card
 card = new THREE.Object3D();
 scene.add( card );
 
 // mesh
 var mesh1 = new THREE.Mesh( geometry1, material1 );
 card.add( mesh1 );
 var mesh2 = new THREE.Mesh( geometry2, material2 );
 card.add( mesh2 );


 return  mesh2
}

const earth = makePlanet()
const moonTwo = makeMoonTwo()

const stars2 = makeStars("/src/particle.png", 4000)

const moon = makeMoon()
const moonGroup = new THREE.Group()
moonGroup.add(moon, moonTwo)
scene.add(moonGroup)
// moon.translateX(-1500)
// moon.rotateY(0.02)


// hold the camera positions
let currentX = 0
let currentY = 0
let aimX = 0
let aimY = 0

const animate = function () {
  const diffX = aimX - currentX
  const diffY = aimY - currentY

  currentX = currentX + diffX * 0.001
  currentY = currentY + diffY * 0.001

  const sphere = new THREE.Spherical(
    2500,
    (currentY * 0.001) - Math.PI / 3,
    (currentX * 0.001)
  )

  camera.position.setFromSpherical(sphere)

  camera.position.x = currentX

  camera.position.y = currentY

  camera.lookAt(scene.position)

  // earth.rotateY(Math.PI / 2)
  // moon.rotateY(0.002)
  // moonGroup.rotateY(0.004)
stars2.rotateY(0.0002)
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}
animate()

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

document.addEventListener('DOMMouseScroll mousewheel', function () {
  if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {

    while(scl==0) {

        scl+=0.05;
                camera.position.z+=scl;
                //console.log("1."+" "+scl);
    }

} else {

    while(scl==0) {


        scl+=0.05;
                camera.position.z-=scl;
                //console.log("2."+" "+scl);
    }

}
//console.log("3."+" "+scl);;
 scl=0;
});

window.setInterval(function(){
     scl=0;
}, 10);

let isMouseDown = false
let startX = 0
let startY = 0

document.addEventListener("mousedown", function (event) {
  isMouseDown = true
  startX = event.pageX
  startY = event.pageY
})

document.addEventListener("mouseup", function () {
  isMouseDown = false
})

document.addEventListener("mousemove", function (event) {
  if (isMouseDown) {
    // aimX = ((window.innerWidth / 2) - event.pageX) * 4
    // aimY = ((window.innerHeight / 2) - event.pageY) * 4
    aimX = aimX + ((event.pageX - startX) * 2)
    aimY = aimY + ((event.pageY - startY) * 2)
    startX = event.pageX
    startY = event.pageY
  }

})

document.addEventListener("touchmove", function (event) {
  aimX = ((window.innerWidth / 2) - event.pageX) * 4
  aimY = ((window.innerHeight / 2) - event.pageY) * 4
})





document.addEventListener("click", function (event) {
  const mouse = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()

  mouse.set(
    (event.pageX / window.innerWidth) * 2 - 1,
    (event.pageY / window.innerHeight) * -2 + 1
  )
  raycaster.setFromCamera(mouse, camera)
  const intersections = raycaster.intersectObjects(earth)
   //const intersections = raycaster.intersectObjects(scene.children, true)
   earth.rotateY(Math.PI)
   moonGroup.rotateY(Math.PI)
  // window.location.assign("about.html");
   setTimeout(function(){ window.location.assign('about.html')}, 5000);

  intersections.forEach(intersection => {

    }

  );
})