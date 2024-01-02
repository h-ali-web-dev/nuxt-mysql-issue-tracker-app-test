import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "",
  secretKey: "",
});

const bucket = "image-bucket";

function setupMinio() {
  minioClient
    .bucketExists(bucket)
    .then((exists) =>
      exists
        ? console.log("Bucket " + bucket + " exists.")
        : minioClient
            .makeBucket(bucket)
            .then(() =>
              console.log("Bucket " + bucket + ' created in "localhost".')
            )
    );
}

export async function storeImage(data: Buffer, fileName: String) {
  setupMinio();
  await minioClient.putObject(
    bucket,
    `${fileName}.jpg`,
    data,
    data.length,
    { "Content-Type": "image/jpeg" },
    function (err, objInfo) {
      if (err) {
        return console.log(`error uploading file ${err}`);
      }
      console.log("Success", objInfo);
    }
  );
}

export async function deleteImage(fileName: string) {
  minioClient.removeObject(bucket, `${fileName}.jpg`);
}
