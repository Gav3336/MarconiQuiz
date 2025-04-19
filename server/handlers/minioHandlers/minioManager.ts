import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    accessKey: 'Z3tfATcm2wF2bMr69ebw',
    secretKey: 'KZHf9DOjr1AF3QvJZZlaf7NEB0sd4u6kclurH2j4'
})

export async function getBucketName() {
    try {
        const buckets = await minioClient.listBuckets()
        console.log('Success', buckets)

        return buckets
    } catch (err) {
        console.log((err as Error).message)
    }
}
