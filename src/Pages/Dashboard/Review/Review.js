import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import review from '../../../images/review-1.png';
import Swal from 'sweetalert2';

const Review = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        fetch("https://whispering-mesa-69203.herokuapp.com/reviews", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire('Review added successfully')
                    reset()
                }
            });
        console.log(data);
    }
    return (
        <div className="container-fluid py-5">
            <h1 className="pt-5 fw-bold text-primary">Send Your Feedback</h1>

            <div className="row mx-auto py-5">
                <div className="col-md-6 col-sm-12 align-self-center">
                    <img className="img-fluid" src={review} alt="" />
                </div>

                <div className="col-md-6 col-sm-12">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input
                            {...register("name")}
                            className="p-2 m-2 w-75 rounded-2"
                            defaultValue={user?.displayName}
                            disabled
                        />

                        <input
                            className='p-2 m-2 w-75 rounded-2'
                            placeholder="City"
                            defaultValue="" {...register("city")} 
                            required
                            />
                        <input
                            {...register("ratting")}
                            className="p-2 m-2 w-75 rounded-2"
                            placeholder="Give your ratting 1-5"
                            required />

                        <textarea
                            {...register("comment")}
                            rows="5"
                            cols="15"
                            className="p-2 m-2 w-75 rounded-2"
                            placeholder="Write your experience"
                            required
                        />

                        <input type="submit"
                            value="Send"
                            className="w-75 rounded-2  btn btn-outline-primary"
                        />

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Review;