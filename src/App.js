import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useState, useRef } from 'react';
import { a, useSpring } from '@react-spring/three';

import './App.css';

extend({ OrbitControls });

function Sphere(props) {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  // userFrame preforms an operaction 60 frames per second
  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  const { size, x } = useSpring({
    size: isBig ? [2,2,2] : [1,1,1],
    x: isBig ? 2 : 0,
  })

  const color = isHovered ? 'pink' : 'salmon';

  return (
    <a.mesh 
    {...props}
    ref={ref}
    scale={size}
    position-x={x}
    castShadow={true}
    receiveShadow={true}
    onClick={() => {
      setIsBig(!isBig)
    }}
    onPointerOut={() => {setIsHovered(false)}}
    onPointerOver={() => {setIsHovered(true)}}
    >
      {/* box args = width, height, depth. see https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry for this and other geometry args */}
      {/* <boxBufferGeometry attach="geometry" args={[1,1,1]}/> */}
      <sphereBufferGeometry attach="geometry" args={[1, 8, 6]} />
      {/* <cylinderBufferGeometry attach="geometry" args={[1,1,3,12]} /> */}
      <meshPhongMaterial
        flatshading={true}
        roughness={1}
        metalness={0.5}
        shininess={100}
        attach="material" 
        color={color} 
         />
    </a.mesh>
  )
}

function Plane() {
  return(
    <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
      <planeBufferGeometry attach="geometry" args={[20, 20]}/>
      <meshPhongMaterial attach="material" color="lightBlue"/>
    </mesh>
  )
}

function Scene() {
  const { 
    camera,
    gl: {
      domElement 
    },
  } = useThree()

  return (
    <>
      <ambientLight /> 
      <spotLight castShadow={true} intensity={0.6} position={[0, 5, 2]} />
      <Sphere rotation={[10,10,0]} intensity={0.2} position={[0,0,0]} />
      <Sphere rotation={[10,20,0]} intensity={0.2} position={[2,2,0]} />
      <Plane />
      <orbitControls  args={[ camera, domElement ]} />
    </>
  )
}
function App() {
  return (
    <Canvas shadows >
      <Scene/>
    </Canvas>
    )
}

export default App;
