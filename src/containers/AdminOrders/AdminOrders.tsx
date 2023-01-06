import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishes, selectFetchAllOrdersLoading, selectOrders} from "../../store/HomeSlice";
import {completeOrder, fetchDishes, fetchOrders} from "../../store/HomeThunks";
import Spinner from "../../components/Spinner/Spinner";

const AdminOrders = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const orders = useAppSelector(selectOrders);
    const fetchAllOrdersLoading = useAppSelector(selectFetchAllOrdersLoading);

    useEffect(() => {
        dispatch(fetchDishes());
        dispatch(fetchOrders());
    }, [dispatch]);

    const completeOrderById = async (id: string) => {
        await dispatch(completeOrder(id));
        await dispatch(fetchOrders());
    }

    let info;

    if (fetchAllOrdersLoading) {
        info = <Spinner/>
    } else {
        info = (
            <>
                {orders.map(order => {
                    const dishesInfo = [];

                    for (let id of Object.keys(order.dishes)) {
                        const dish = dishes.find(dish => dish.id === id);

                        if (dish) {
                            dishesInfo.push(
                                <div className="d-flex align-items-center justify-content-between mt-5" key={dish.id}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="me-3 m-0">{dish.name}</p>
                                        <p className="m-0">x {order.dishes[id]}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="m-0 me-2">{dish.price * order.dishes[id]} KGS</p>
                                    </div>
                                </div>
                            );
                        }
                    }

                    return <div key={order.id} className={"border"}>
                        {dishesInfo}
                        <button className="btn btn-danger" onClick={() => completeOrderById(order.id)}>Complete</button>
                    </div>
                })}
            </>
        )
    }

    return (
        <div>
            {info}
        </div>
    );
};

export default AdminOrders;