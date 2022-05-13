import React, {useState} from 'react';
import {useContext} from "react";
import {FilterContext} from "../../../context/filterContext";

const TextForm = () => {

    const [inputState, setInputState] = useState('введите значение')
    const {resetFilteredState, setFilterState} = useContext(FilterContext)

    function resetInputValueHandler(){
        setInputState('')
        resetFilteredState()
    }
    function changeInputValueHandler(event){
        event.target.value.trim()
            ? setFilterState((prev)=> {
                    return {
                        ...prev,
                        value: event.target.value.trim()
                    }
                })
            : resetFilteredState()

        setInputState(event.target.value)
    }

    return (
        <input
            type={"text"}
            value={inputState}
            onClick={resetInputValueHandler.bind(this)}
            onChange={changeInputValueHandler.bind(this)}
        />
    );
};

export default TextForm;