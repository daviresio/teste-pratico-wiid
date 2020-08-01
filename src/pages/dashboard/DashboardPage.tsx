import React, {useEffect} from 'react';
import PageLayout from "../../layout/PageLayout";
import Navbar from "../../layout/navbar/Navbar";
import DashboardContent from "./DashboardContent";
import {useDispatch, useSelector} from "react-redux";
import {DataCreators} from "../../store/sagas/data";
import {useParams} from "react-router";

const DashboardPage = () => {

    const dispatch = useDispatch()
    const {submenuId: subMenuId} = useParams()

    useEffect(() => {
        dispatch(DataCreators.listMenus())
    }, [dispatch])

    useEffect(() => {
        dispatch(DataCreators.listMails(subMenuId))
    }, [dispatch, subMenuId])

    return (
        <PageLayout>
            <Navbar />
            <DashboardContent />
        </PageLayout>
    );
};

DashboardPage.routeName = '/dashboard'

export default DashboardPage;
