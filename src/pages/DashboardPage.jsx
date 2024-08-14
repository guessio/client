import React from 'react';
import Card from '../components/Card';
import Input from '../components/Input';

const DashboardPage = () => {
    const cards = Array.from({ length: 50 }, (_, i) => i + 1);

    return (
        <>
            <div className='justify-center items-center max-w-full pt-10 mx-auto'>

                <Input />
                <div className="flex grid lg:grid-cols-5 gap-5 lg:m-20 cursor-pointer">
                    {cards.map((number) => (
                        <Card key={number} num={number} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default DashboardPage;
