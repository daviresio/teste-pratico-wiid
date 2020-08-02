import React, {useEffect} from 'react';
import PageLayout from "../../layout/PageLayout";
import Navbar from "../../layout/navbar/Navbar";
import DashboardContent from "./DashboardContent";
import {useDispatch, useSelector} from "react-redux";
import {DataCreators} from "../../store/reducers_sagas/data";
import {useHistory, useParams} from "react-router";
import {State} from "../../models/state.model";

const DashboardPage = () => {

    const dispatch = useDispatch()
    const {submenuId: subMenuId} = useParams()
    const itemsMenu = useSelector((state: State) => state.data.itemsMenu)
    const history = useHistory()

    useEffect(() => {
        dispatch(DataCreators.listMenus())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(itemsMenu.length && !subMenuId) {
            history.push(DashboardPage.routeName + '/' + itemsMenu[0].subMenus[0].id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subMenuId, itemsMenu])

    useEffect(() => {
        if(subMenuId) {
            dispatch(DataCreators.listMails(subMenuId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subMenuId])

    return (
        <PageLayout>
            <Navbar />
            <DashboardContent />
        </PageLayout>
    );
};

DashboardPage.routeName = '/dashboard'

export default DashboardPage;
