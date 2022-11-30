import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Checkbox, Label, Select, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { API } from '../api/api'

const submitNewProduct = async(data) => {
    return await API.post("/product", data).then(res => res.data).catch(error => error.message)
}

const SimpleForm = () => {

    const queryClient = useQueryClient();
    const {handleSubmit, formState: {errors} , register, reset, clearErrors} = useForm()


    const mutation = useMutation(submitNewProduct, {
        onMutate: async (newData) => {
            // Cancel Refetching Process
            await queryClient.cancelQueries(["get-products"]);

            // Get Last Query Data
            const previousData = queryClient.getQueryData(["get-products"]);
            
            // Set New Data
            if (previousData) {
                newData = { ...newData};
                const finalData = [...previousData, newData];
                queryClient.setQueryData(["get-products"], finalData);
              }
              return { previousData };
        },
        onSettled: (data, error) => {
            if(data) {
                clearErrors();
                reset();
            }
            console.log("onSettled data", data)
            console.log("onSettled error", error)
        },
    })

    const onSubmit = async (data) => {
        await mutation.mutate(data)
    }

  return (
    <form className="flex flex-col gap-4 border border-slate-700 p-4 rounded-xl">
        <div>
            <div className="mb-2 block">
            <Label
                htmlFor="name"
                value="Product"
            />
            </div>
            <TextInput
                id="name"
                type="text"
                placeholder="Apple etc."
                {
                    ...register("name", {required: "Product Name Required"})
                }
            />
            {errors.product && (
                <div className='py-2 text-red-600 font-light'>
                    <span>{errors.product.message}</span>
                </div>
            )}
        </div>
        <div id="select">
            <div className="mb-2 block">
                <Label
                htmlFor="color"
                value="Select Color"
                />
            </div>
            <Select
                id="color"
                {
                    ...register("color", {required: "Color Must Be Selected"})
                }
            >
                <option value="" selected disabled>
                Select Color
                </option>
                <option>
                White
                </option>
                <option>
                Black
                </option>
                <option>
                Silver
                </option>
                <option>
                Blue
                </option>
            </Select>
            {errors.color && (
                <div className='py-2 text-red-600 font-light'>
                <span>{errors.color.message}</span>
            </div>
            )}
        </div>
        <div id="select">
            <div className="mb-2 block">
                <Label
                htmlFor="category"
                value="Category"
                />
            </div>
            <Select
                id="category"
                {
                    ...register("category", {required: "Category Must Be Selected"})
                }
            >
                <option value="" selected disabled>
                Select Category
                </option>
                <option>
                Laptop
                </option>
                <option>
                PC
                </option>
                <option>
                Handphone
                </option>
                <option>
                Accessories
                </option>
            </Select>
            {errors.category && (
                <div className='py-2 text-red-600 font-light'>
                <span>{errors.category.message}</span>
            </div>
            )}
        </div>
        <div>
            <div className="mb-2 block">
            <Label
                htmlFor="price"
                value="Price"
            />
            </div>
            <TextInput
            id="price"
            type="number"
            placeholder='Ex. $1'
            addon="$"
            {...register("price", {required: "Price Must Be Filled"})}
            />
            {errors.price && (
                <div className='py-2 text-red-600 font-light'>
                <span>{errors.price.message}</span>
            </div>
            )}
            
        </div>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
            {mutation.isLoading ? (
                <>
                    <div className="mr-3">
                        <Spinner
                        size="sm"
                        light={true}
                        />
                    </div>
                    Loading ...
                </>
            ) : `Add`}
        </Button>
    </form>
  )
}

export default SimpleForm