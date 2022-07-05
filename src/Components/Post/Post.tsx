import {useNavigate, useParams } from "react-router-dom";
import React, {useState, useEffect, ChangeEvent, FC, useContext} from "react"
import {useQuery} from "@apollo/client";
import {GET_POST} from "../../query/post";
import {IPost} from "../../types/post";
import styles from './post.module.scss'
import { Context } from "../..";


const Post: FC = () => {

    const {isLoading, setIsLoading} = useContext(Context)!


    const navigate = useNavigate()
    const {id = 1} = useParams()

    const [newId, setNewId] = useState<string | null>(null);
    const [post, setPost] = useState<IPost | null>(null);

    const {data, loading, error} = useQuery(GET_POST, {
        variables: {id: `${id}`},
    });

    useEffect(() => {
        setIsLoading(true)
        if (data) {
            setPost(data.post)
            setIsLoading(false)
        }
    }, [data]);

    const getRandomPost = () => {
        const randomId = Math.floor(Math.random() * 1000)
        setIsLoading(true)
        navigate(`/post/${randomId}`, {replace: true})
    }

    const getSeparatePost = () => {
        if (newId) {
            setIsLoading(true)
            navigate(`/post/${newId}`, {replace: true})
        } else {
            alert('Пусте поле')
        }

    }

    const fakePost = {
        author: {
            id: "f7feaa78-23a7-4a89-85b7-25fdfb4f1b2f",
        },
        createdAt: "1999-04-20T22:32:01Z",
        text: "Aut perferendis consequatur sit voluptatem accusantium.",
        updatedAt: null,
    }

    if (isLoading) {

        // Заглушка поки не прийдуть дані з бекенду

        return (
            <section className={styles.Post}>
                <div>
                    <button className={styles.post__button} onClick={getRandomPost}>Отримати рандомний пост</button>
                    <button className={styles.post__button} onClick={getSeparatePost} >Отримати пост по id</button>
                    <input className={styles.post__input}  min={0} onChange={(e:ChangeEvent<HTMLInputElement>) => {
                        if (Number(e.target.value) < 0) {
                            return e.target.value = '0'
                        }
                        setNewId(e.target.value)
                    }} placeholder={'Обовязково цифри'} type={"number"}/>
                </div>
                <div className={styles.fakePost__card }>
                    <h1 className={styles.fakePost__card__title}>{fakePost.author.id}</h1>
                    <br/>
                    <h3 className={styles.fakePost__card__text}>{fakePost.text}</h3>
                    <br/>
                    <p className={styles.fakePost__card__date}>{fakePost.createdAt}</p>
                </div>
                <button className={styles.post__button}>Видалити цей пост</button>
                <button className={styles.post__button}>Змінити цей пост</button>
            </section>
        )
    }

    if (!post) {
        return (
            <section className={styles.Post}>
                <h1>Не знайдено</h1>
                <div>
                    <button className={styles.post__button} onClick={getRandomPost}>Отримати рандомний пост</button>
                    <button className={styles.post__button} onClick={getSeparatePost} >Отримати пост по id</button>
                    <input className={styles.post__input}  min={0} onChange={(e:ChangeEvent<HTMLInputElement>) => {
                        if (Number(e.target.value) < 0) {
                            // alert('Значення менше нуля')
                            return e.target.value = '0'
                        }
                        setNewId(e.target.value)
                    }} placeholder={'Обовязково цифри'} type={"number"}/>
                </div>
            </section>
        )
    }


    return (
        <section className={styles.Post}>
            <div>
                <button className={styles.post__button} onClick={getRandomPost}>Отримати рандомний пост</button>
                <button className={styles.post__button} onClick={getSeparatePost} >Отримати пост по id</button>
                <input className={styles.post__input}  min={0} onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    if (Number(e.target.value) < 0) {
                        return e.target.value = '0'
                    }
                    setNewId(e.target.value)
                }} placeholder={'Обовязково цифри'} type={"number"}/>
            </div>
                <div className={styles.post__card }>
                    <h1 className={styles.post__card__title}>{post.author.id}</h1>
                    <h3 className={styles.post__card__text}>{post.text}</h3>
                    <p className={styles.post__card__date}>{post.createdAt}</p>
                </div>

            <button className={styles.post__button}>Видалити цей пост</button>
            <button className={styles.post__button}>Змінити цей пост</button>
        </section>
    )
}

export default Post