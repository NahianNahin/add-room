
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';




const RoomUpload = () => {




    const imgbbKey = process.env.REACT_APP_imgbb_key;
    console.log(imgbbKey);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const {
            room_name,
            location,
            rent,
            deposit,
            rent_duration,
            category,
            room_size,
            room_condition,
            details
        } = data;
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        // Upload image in IMGBB 
        const img = data.image[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(dataImg => {
                console.log(dataImg);
                if (dataImg.success) {
                    const roomImage = dataImg.data.url;
                    const room = {
                        room_name,
                        post_date: currentDate,
                        location,
                        rent,
                        deposit,
                        rent_duration,
                        category,
                        roomImage,
                        room_size,
                        room_condition,
                        details,
                        booked: false

                    }
                    console.log(room);
                    // POST
                    fetch(`https://sweet-home-server.vercel.app/rooms`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('sweet_home_Token')}`
                        },
                        body: JSON.stringify(room)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                console.log('Post Successfully');
                                toast.success('Room Add successfully');

                            }
                        })

                }
            })
            .catch(error => console.log(error));



    }
    return (
        <div>
            <div className='flex justify-center items-center my-[50px]'>
                <div className='shadow-xl p-7 rounded-2xl w-[450px] lg:w-[700px] border-t-2 border-primary'>
                    <div className='flex items-center justify-center my-7 animate-bounce'>
                        <p className='text-7xl'>R</p>
                        <div className='h-10 w-10 border-8 border-dashed animate-spin border-primary rounded-full mt-5'></div>
                        <div className='h-10 w-10 border-8 border-dashed animate-spin border-primary rounded-full mt-5'></div>
                        <p className='text-7xl'>m</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Room Name</span>
                                </label>
                                <input type="text" {...register("room_name")} className="input w-full input-bordered" required />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input type="text" {...register("location")} className="input w-full input-bordered" required />
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Rent</span>
                                </label>
                                <input type="number" {...register("rent")} className="input w-full input-bordered" required />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Deposit</span>
                                </label>
                                <input type="number" {...register("deposit")} className="input w-full input-bordered" required />
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Room Size (Meter Squre)</span>
                                </label>
                                <input type="number" {...register("room_size")} className="input w-full input-bordered" required />
                            </div>
                            <div className='form-control p-2 w-full'>
                                <label className="label">
                                    <span className="label-text">Room Condition</span>
                                </label>
                                <select {...register("room_condition")} className="input w-full input-bordered">
                                    <option value='Excellent'>Excellent</option>
                                    <option value='Good'>Good</option>
                                    <option value='Fair'>Fair</option>
                                </select>
                            </div>

                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            <div className="form-control p-2 w-full">
                                <label className="label">
                                    <span className="label-text">Rent Duration</span>
                                </label>
                                <select {...register("rent_duration")} className="input w-full input-bordered">
                                    <option value="3 Months">3 Months</option>
                                    <option value="6 Months">6 Months</option>
                                    <option value="1 year">1 year</option>
                                    <option value="2 years">2 years</option>
                                </select>
                            </div>
                            <div className="form-control p-2 w-full">
                                <label className="label">
                                    <span className="label-text">Catagory</span>
                                </label>
                                <select {...register("category")} className="input w-full input-bordered">

                                    <option value="studio apartment">studio apartment</option>
                                    <option value="shared apartment">shared apartment</option>

                                </select>
                            </div>
                        </div>

                        <input
                            {...register("image")}
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full text-[16px]  my-4 font-bold"
                            accept='image/*'
                            required /> <br />
                        <textarea
                            {...register("details")}
                            className="textarea textarea-primary w-full mb-3"
                            placeholder="Details"
                            required>
                        </textarea>
                        <button
                            className='btn bg-gradient-to-r from-primary to-secondary w-full text-[16px] mb-2 text-white font-bold'>
                            ADD ROOM
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default RoomUpload;