import React from 'react';
import ImageUploader from 'react-images-upload';

export default function UploadImage (props){
    <form>
        <label>
            File Upload URL:
            <input id="urlInput" type="text" onChange={props.onUrlChange} value={props.url}></input>
        </label>
        <ImageUploader
            key="image-uploader"
            withIcon={true}
            singleImage={true}
            withPreview={true}
            label="Maximum size file: 5MB"
            buttonText="Choose an image"
            onChange={props.onImage}
            imgExtension={['.jpg', '.png', '.jpeg']}
            maxFileSize={5242880}
        ></ImageUploader>
    </form>
}
