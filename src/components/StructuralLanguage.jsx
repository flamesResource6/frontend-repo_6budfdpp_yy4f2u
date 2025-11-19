import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Nodes({ count = 60 }) {
  const group = useRef()
  const mouse = useRef(new THREE.Vector2(0, 0))
  const targetPos = useRef(new THREE.Vector3())

  const points = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const r = 2.2
      arr.push(new THREE.Vector3(
        (Math.random() - 0.5) * r,
        (Math.random() - 0.5) * r,
        (Math.random() - 0.5) * r
      ))
    }
    return arr
  }, [count])

  const cubes = useMemo(() => points.map((p) => ({ position: p.clone(), size: 0.04 + Math.random()*0.03 })), [points])

  const lines = useMemo(() => {
    const segs = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = points[i].distanceTo(points[j])
        if (d < 0.9 && Math.random() < 0.12) segs.push([points[i], points[j]])
      }
    }
    return segs
  }, [points])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!group.current) return
    group.current.rotation.y = t * 0.02
    group.current.rotation.x = Math.sin(t * 0.1) * 0.05
    // Gravitate slightly toward cursor
    targetPos.current.set(mouse.current.x * 0.3, mouse.current.y * 0.3, 0)
    group.current.position.lerp(targetPos.current, 0.02)
  })

  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    mouse.current.set(x, y)
  }

  return (
    <group ref={group} onPointerMove={onPointerMove}>
      {/* lines */}
      <group>
        {lines.map((seg, i) => {
          const geo = new THREE.BufferGeometry().setFromPoints(seg)
          return (
            <line key={i} geometry={geo}>
              <lineBasicMaterial color="#050505" linewidth={1} />
            </line>
          )
        })}
      </group>
      {/* cubes */}
      {cubes.map((c, i) => (
        <mesh key={i} position={c.position.toArray()}>
          <boxGeometry args={[c.size, c.size, c.size]} />
          <meshBasicMaterial wireframe color={i % 20 === 0 ? '#0047FF' : '#050505'} />
        </mesh>
      ))}
    </group>
  )
}

export default function StructuralLanguage() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.3} />
      <Nodes />
    </Canvas>
  )
}
