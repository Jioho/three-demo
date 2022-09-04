import { CubeTexture, Texture } from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
type NormalType = 'gltfModel' | 'texture'
type ArrayType = 'cubeTexure'

// type SourceType = NormalType & ArrayType

export type source =
  | {
      name: string
      type: ArrayType
      typeName: unknown
      path: string[]
    }
  | {
      name: string
      type: NormalType
      typeName: unknown
      path: string
    }

// type sources = readonly source[]

const sources = [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexure',
    typeName: 'CubeTexture',
    path: [
      './static/textures/environmentMap/px.jpg',
      './static/textures/environmentMap/nx.jpg',
      './static/textures/environmentMap/py.jpg',
      './static/textures/environmentMap/ny.jpg',
      './static/textures/environmentMap/pz.jpg',
      './static/textures/environmentMap/nz.jpg'
    ]
  },
  {
    name: 'grassColorTexture',
    type: 'texture',
    typeName: 'texture',
    path: './static/textures/dirt/color.jpg'
  },
  {
    name: 'grassNormalTexture',
    type: 'texture',
    typeName: 'texture',
    path: './static/textures/dirt/normal.jpg'
  },
  {
    name: 'foxModel',
    type: 'gltfModel',
    typeName: 'GLTF',
    path: './static/models/Fox/glTF/Fox.gltf'
  }
] as const

export type sourceName = {
  texture: Texture
  GLTF: GLTF
  CubeTexture: CubeTexture
}

export type sourcesMap<T extends readonly unknown[] = [], M = {}> = T extends readonly [infer F extends { name: string; typeName: unknown }, ...infer R]
  ? sourcesMap<R, M & Record<F['name'], F['typeName'] extends keyof sourceName ? sourceName[F['typeName']] : never>>
  : M

// export type sour = sourcesMap<typeof sources>

export default sources
