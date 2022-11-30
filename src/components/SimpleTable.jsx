import { useQuery } from '@tanstack/react-query'
import { Label, Spinner, Table, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { API } from '../api/api'

const SimpleTable = () => {
    const [isEdit, setIsEdit] = useState({
        id: 1,
        status: false
    })

    const getProducts = async () => {
        return await API.get('/product').then(res => res.data)
    }

    const {
        data, 
        isError,
        isLoading,
        isRefetching,
        isSuccess,} = useQuery(["get-products"], getProducts, {
        refetchInterval: 15000,
    })
  return (
    <form>
        <Table>
            <Table.Head>
                <Table.HeadCell>
                Product name
                </Table.HeadCell>
                <Table.HeadCell>
                Color
                </Table.HeadCell>
                <Table.HeadCell>
                Category
                </Table.HeadCell>
                <Table.HeadCell>
                Price
                </Table.HeadCell>
                <Table.HeadCell>
                <span className="sr-only">
                    Edit
                </span>
                </Table.HeadCell>
                <Table.HeadCell>
                <span className="sr-only">
                    Delete
                </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y ">
                {isLoading || isRefetching && (
                    <Table.Row className='text-center'>
                        <Table.Cell/>
                        <Table.Cell/>
                        <Spinner aria-label="Default status example" size="xl" className='my-4'/>
                    </Table.Row>
                )}
                {isError && (
                    <Table.Row className='text-center'>
                        <Table.Cell/>
                        <Table.Cell/>
                        <h1 className='my-4 text-red-400 text-xl font-semibold'>Something went wrong!!</h1>
                    </Table.Row>
                )}
                {isSuccess && data?.map(item => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {isEdit.id === item.id && isEdit.status ? 
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="name"
                                    />
                                </div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                    />
                            </div> : `${item.name}`}
                    </Table.Cell>
                    <Table.Cell>
                            {isEdit.id === item.id && isEdit.status ? 
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="color"
                                    />
                                </div>
                                    <TextInput
                                        id="color"
                                        type="text"
                                    />
                            </div> : `${item.color}`}
                    </Table.Cell>
                    <Table.Cell>
                        {isEdit.id === item.id && isEdit.status ? 
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="category"
                                    />
                                </div>
                                    <TextInput
                                        id="category"
                                        type="text"
                                    />
                            </div> : `${item.category}`}
                    </Table.Cell>
                    <Table.Cell>
                        {isEdit.id === item.id && isEdit.status ? 
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="category"
                                    />
                                </div>
                                    <TextInput
                                        id="category"
                                        type="text"
                                    />
                            </div> : `$${item.price}`}
                    </Table.Cell>
                    <Table.Cell>
                        <span
                        onClick={() => isEdit.id === item.id && isEdit.status === false ? setIsEdit({
                            id: item.id,
                            status: true
                        }) : setIsEdit({
                            id: item.id,
                            status: false
                        })}
                        className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            {isEdit.status === false ? `Edit` : `Cancel`}
                        </span>
                    </Table.Cell>
                    {isEdit.id === item.id && isEdit.status === true && (
                        <Table.Cell>
                            <span
                            // onClick={() => isEdit.id === item.id && isEdit.status === false ? setIsEdit({
                            //     id: item.id,
                            //     status: true
                            // }) : setIsEdit({
                            //     id: item.id,
                            //     status: false
                            // })}
                            className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Save
                            </span>
                        </Table.Cell>
                    )}
                    <Table.Cell>
                        <span
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:no-underline"
                        >
                        ❌
                        </span>
                    </Table.Cell>
                </Table.Row>
                ))}
                
            </Table.Body>
        </Table>
    </form>
  )
}

export default SimpleTable