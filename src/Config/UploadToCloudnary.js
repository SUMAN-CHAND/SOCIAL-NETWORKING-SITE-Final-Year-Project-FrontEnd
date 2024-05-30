export const UploadToCloudnary = async (image) => {
    if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "pgkfzh4c");
        data.append("cloud_name", "df2jzpxon")

        const res = await fetch("https://api.cloudinary.com/v1_1/df2jzpxon/image/upload", {
            method: "POST",
            body: data
        })

        const fileData = await res.json();
        console.log(fileData)
        return fileData.url.toString();

    }
}