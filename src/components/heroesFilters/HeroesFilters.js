// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";


import {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} from '../../actions'
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {

    const {filters, filterLoadingStatus, activeFilter} = useSelector(state => state)
    const dispatch = useDispatch()
    const {request} = useHttp()

    useEffect(() => {
        dispatch(filtersFetching())
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
    }, [])

    if (filterLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filterLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Помилка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if(arr.length === 0) {
            return <h5 className="text-center mt-5">Фільтри не знайдені</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            })

            return <button
                        key={name}
                        id={name}
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;