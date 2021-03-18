import { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { agent, ME, IErrorMessage } from '../../utils';
import { Button, FileInput, ImageCropper, FormTitleAndError } from '..';

interface IProp {
    clearEditing: () => void;
}
const PhotoUpload = ({ clearEditing }: IProp) => {
    const [files, setFiles] = useState<any[]>([]);
    const [image, setImage] = useState<Blob | null>(null);
    const queryClient = useQueryClient();


    const methods = useForm<Blob>();

    const mutation = useMutation(agent.User.uploadPhoto, {
        onSuccess: (data) => {
            clearEditing();
            queryClient.invalidateQueries(ME);
            reset();
            toast.success("Profile photo successfully Changed!");
        },
        onError: (error: AxiosResponse<IErrorMessage>) => {
            console.log('chrisgya error: ', error);
        }
    });

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('photo', new File([image as Blob], files[0].name));
        mutation.mutate(formData);
    }

    const reset = () => {
        setFiles([]);
        clearEditing();
    }


    return (
        <>
            <FormTitleAndError title="" mutation={mutation} />

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <div className="shadow-lg">
                        <span className="text-base text-blue-500 ">Add Photo</span>
                        <FileInput name="passportPhoto" label="Drag 'n' drop your photo here, or click to select photo" setFiles={setFiles} disabled={mutation.isLoading} />
                    </div>
                    {files.length > 0 && <div className="my-2 shadow-lg">
                        <span className="text-base text-blue-500">Resize Image</span>
                        <ImageCropper setImage={setImage} imagePreview={files[0].preview} />
                    </div>}
                    <div>


                        <div className="flex items-center justify-between space-x-4">
                            {files.length > 0 && <Button type="submit" name="Submit" isBusy={mutation.isLoading} />}
                            <Button type="button" name="Cancel" isBusy={mutation.isLoading} onClick={reset} />
                        </div>


                    </div>
                </form>
            </FormProvider>
        </>)
}

export default PhotoUpload
