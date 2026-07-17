import { set, get, del } from 'idb-keyval'

export function savePdfFile(id, file) {
  return set(id, file)
}

export function getPdfFile(id) {
  return get(id)
}

export function deletePdfFile(id) {
  return del(id)
}
