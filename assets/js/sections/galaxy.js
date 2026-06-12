const container = document.getElementById("galaxy-container");

/* ==========================
   ESCENA
========================== */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 80;

/* ==========================
   RENDERER
========================== */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

container.appendChild(renderer.domElement);

/* ==========================
   ESTRELLAS
========================== */

const starsGeometry = new THREE.BufferGeometry();

const starCount = 15000;

const starPositions = [];

for(let i = 0; i < starCount; i++){

    starPositions.push(
        (Math.random() - 0.5) * 500
    );

    starPositions.push(
        (Math.random() - 0.5) * 500
    );

    starPositions.push(
        (Math.random() - 0.5) * 500
    );

}

starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        starPositions,
        3
    )
);

const starsMaterial = new THREE.PointsMaterial({

    color: 0xffffff,

    size: 0.35

});

const stars = new THREE.Points(
    starsGeometry,
    starsMaterial
);

scene.add(stars);

/* ==========================
   CORAZÓN DE PARTÍCULAS
========================== */

const heartGeometry =
    new THREE.BufferGeometry();

const heartPositions = [];

const heartCount = 3000;

for(let i = 0; i < heartCount; i++){

    const t =
        Math.random() *
        Math.PI * 2;

    const x =
        16 * Math.pow(
            Math.sin(t),
            3
        );

    const y =
        13 * Math.cos(t)
        -
        5 * Math.cos(2*t)
        -
        2 * Math.cos(3*t)
        -
        Math.cos(4*t);

    const scale =
        0.8 +
        Math.random() * 0.4;

    heartPositions.push(
        x * scale
    );

    heartPositions.push(
        y * scale
    );

    heartPositions.push(
        (Math.random()-0.5)
        * 4
    );

}

heartGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        heartPositions,
        3
    )
);

const heartMaterial =
new THREE.PointsMaterial({

    color:0xff6b9d,

    size:0.45,

    transparent:true,

    opacity:0.95

});

const heart =
    new THREE.Points(
        heartGeometry,
        heartMaterial
    );

heart.scale.set(
    1.5,
    1.5,
    1.5
);

scene.add(heart);
heart.position.y = 18;
/* ==========================
   BRAZOS DE GALAXIA
========================== */

const galaxyGeometry =
    new THREE.BufferGeometry();

const galaxyPositions = [];

const galaxyCount = 8000;

for(let i = 0; i < galaxyCount; i++){

    const radius =
        Math.random() * 90;

    const spin =
        radius * 0.35;

    const branch =
        (i % 3) *
        ((Math.PI * 2) / 3);

    const angle =
        spin + branch;

    const randomX =
        (Math.random() - 0.5) *
        (radius * 0.15);

const randomY =
    -18 +
    (Math.random() - 0.5) *
    6;

    const randomZ =
        (Math.random() - 0.5) *
        (radius * 0.15);

    galaxyPositions.push(
        Math.cos(angle)
        * radius
        + randomX
    );

    galaxyPositions.push(
        randomY
    );

    galaxyPositions.push(
        Math.sin(angle)
        * radius
        + randomZ
    );

}

galaxyGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        galaxyPositions,
        3
    )
);

const galaxyMaterial =
new THREE.PointsMaterial({

    color:0xffe6a3,

    size:0.18,

    transparent:true,

    opacity:0.8

});

const galaxy =
    new THREE.Points(
        galaxyGeometry,
        galaxyMaterial
    );

scene.add(galaxy);


/* ==========================
   GALAXIA DE FOTOS
========================== */

const photoGroup = new THREE.Group();

scene.add(photoGroup);

const textureLoader = new THREE.TextureLoader();

const photos = [

    "assets/img/gallery/photo1.jpg",
    "assets/img/gallery/photo2.jpg",
    "assets/img/gallery/photo3.jpg",
    "assets/img/gallery/photo4.jpg",
    "assets/img/gallery/photo5.jpg",
    "assets/img/gallery/photo6.jpg"

    // hasta photo20.jpg

];

const photoData = [];

photos.forEach((photo,index)=>{

    const texture =
        textureLoader.load(photo);

    const geometry =
        new THREE.PlaneGeometry(
            10,
            10
        );

    const material =
        new THREE.MeshBasicMaterial({

            map:texture,

            transparent:true,

            side:THREE.DoubleSide

        });

    const image =
        new THREE.Mesh(
            geometry,
            material
        );

    const angle =
        index * 0.8;

    const radius =
        18 + (index * 2.8);

    image.position.x =
        Math.cos(angle)
        * radius;

    image.position.z =
        Math.sin(angle)
        * radius;

image.position.y =
-18 +
(Math.random() - 0.5)
* 8;

    photoGroup.add(image);

    photoData.push({

        mesh:image,

        angle:angle,

        radius:radius,

        speed:
            0.0008 +
            Math.random() * 0.0005,

        offset:
            Math.random() * 100

    });

});

/* ==========================
   MOUSE
========================== */

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
    "mousemove",
    (event)=>{

        mouseX =
            (event.clientX -
            window.innerWidth / 2)
            * 0.001;

        mouseY =
            (event.clientY -
            window.innerHeight / 2)
            * 0.001;

    }
);

/* ==========================
   ANIMACIÓN
========================== */

function animate(){

    requestAnimationFrame(
        animate
    );

    const time =
        Date.now() * 0.001;

    /* Latido */

const pulse =
    1 +
    Math.sin(time * 2)
    * 0.08;

heart.scale.set(
    pulse * 1.5,
    pulse * 1.5,
    pulse * 1.5
);

heart.rotation.y += 0.002;
galaxy.rotation.y += 0.0004;
photoGroup.rotation.y += 0.0005;

    /* Estrellas */

    stars.rotation.y += 0.0002;

    stars.rotation.x += 0.00005;

    /* Fotos */

   photoData.forEach((photo)=>{

    photo.angle +=
        photo.speed;

    photo.mesh.position.x =
        Math.cos(photo.angle)
        * photo.radius;

    photo.mesh.position.z =
        Math.sin(photo.angle)
        * photo.radius;

    photo.mesh.position.y =
        Math.sin(
            time +
            photo.offset
        ) * 2;

    photo.mesh.lookAt(
        camera.position
    );

});

    /* Cámara */

    camera.position.x +=
        (
            mouseX * 30 -
            camera.position.x
        ) * 0.02;

    camera.position.y +=
        (
            -mouseY * 30 -
            camera.position.y
        ) * 0.02;

    camera.lookAt(
        scene.position
    );

    renderer.render(
        scene,
        camera
    );

}

animate();

/* ==========================
   RESPONSIVE
========================== */

window.addEventListener(
    "resize",
    ()=>{

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);