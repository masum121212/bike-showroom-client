import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fullStar, } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import './Purchase.css'
import Swal from 'sweetalert2';

const Purchase = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [purchases, setPurchases] = useState({});

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                const purchases = data?.find(purchase => purchase?._id === id)
                setPurchases(purchases);
                reset(purchases)
            })
    }, [id, reset])

    const onSubmit = data => {
        data.status = 'pending'
        delete data._id;
        fetch('http://localhost:5000/purchases', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    Swal.fire('Your Order Successfully Added!!')
                    reset();
                }
            })
    };

    return (
        <div className="pt-5">
            <div className="container">
                <h1 className="py-5 fw-bold text-primary">Item Details</h1>
                <div className="row mx-auto gx-5">

                    <div className="col-md-7 col-sm-12 align-self-center">
                        <div className="text-start">
                            <img className="img-fluid w-50 pb-3" src={purchases?.img} alt="" />
                        </div>

                        <div className=" text-start">
                            <h3 className="pb-1 fw-bold">{purchases?.title}</h3>

                            <h6 className="pb-1"> Brand:  {purchases?.brand}</h6>
                            

                            <Rating readonly
                                style={{ color: "orange" }}
                                initialRating={purchases?.rating}
                                emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
                                fullSymbol={<FontAwesomeIcon icon={fullStar} />}
                            />{' '} <span>{purchases?.rating}</span> |
                            <span>( total {purchases?.ratingCount} reviews given) </span>

                            <h6 className="pt-2 pb-1">Description: {purchases?.description}</h6>

                            <h2 className="fw-bold pt-2"> <sup>$</sup>{purchases?.price} <span className="fs-5">Only</span> </h2>

                        </div>

                    </div>

                    <div className="col-md-5 col-sm-12 align-self-center">
                        <h1 className="pb-3 text-primary fw-bold">Update Important information</h1>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                className='p-2 me-2 mb-3  rounded-3'
                                defaultValue={user?.displayName}
                                {...register("name")} />

                            <input
                                className='p-2 me-2 mb-3  rounded-3'
                                defaultValue={user?.email}
                                {...register("email", { required: true })} />

                            {errors?.email && <span className="error">This field is required</span>}
                            <br />

                            <input
                                className='p-2 me-2 mb-3  rounded-3'
                                placeholder="Address"
                                defaultValue="" {...register("address")} />

                            <input
                                className='p-2 me-2 mb-3  rounded-3'
                                placeholder="City"
                                defaultValue="" {...register("city")} />

                            <br />

                            <input
                                className='p-2 me-2 mb-3  rounded-3'
                                placeholder="Phone"
                                defaultValue="" {...register("phone")} />

                            <input
                                className='p-2 me-2 mb-3  rounded-3'
                                defaultValue={purchases?._id}
                                {...register("purchase")} />
                            <br />

                            <input
                                
                                className="btn btn-outline-primary w-50  mb-5 rounded-3 p-2"
                                type="submit"
                                value="Purchase" />

                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Purchase;