import { TDAsset, TldrawApp } from '@tldraw/tldraw'
import { useCallback } from 'react'

export function useMultiplayerAssets() {
  const onAssetCreate = useCallback(
    // Send the asset to our upload endpoint, which in turn will send it to AWS and
    // respond with the URL of the uploaded file.
    async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
      const filename = encodeURIComponent(file.name)

      const fileType = encodeURIComponent(file.type)

      const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`)

      const { url, fields } = await res.json()

      const formData = new FormData()

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as any)
      })

      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!upload.ok) return false

      return url + '/' + filename
    },
    []
  )

  const onAssetUpload = useCallback(
    // Send the asset to our upload endpoint, which in turn will send it to AWS and
    // respond with the URL of the uploaded file.
    async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
      const filename = encodeURIComponent(file.name)

      const fileType = encodeURIComponent(file.type)

      const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`)

      const { url, fields } = await res.json()

      const formData = new FormData()

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as any)
      })

      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!upload.ok) return false

      return url + '/' + filename
    },
    []
  )

  const onAssetUpload = useCallback(
    // Send the asset to our upload enpoint, which in turn will send it to AWS and
    // respond with the URL of the uploaded file.
    async (app: TldrawApp, id: string, asset: TDAsset): Promise<string | false> => {
      const filename = encodeURIComponent(asset.id)

      const fileType = encodeURIComponent(asset.type)

      const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`)

      const { url, fields } = await res.json()

      const formData = new FormData()

      Object.entries({ ...fields, asset }).forEach(([key, value]) => {
        formData.append(key, value as any)
      })

      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!upload.ok) return false

      return url + '/' + filename
    },
    []
  )

  const onAssetDelete = useCallback(async (app: TldrawApp, id: string): Promise<boolean> => {
    // noop
    return true
  }, [])

  return { onAssetCreate, onAssetUpload, onAssetDelete }
}
