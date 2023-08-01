import React, {useContext, useEffect, useState} from "react";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { StateContext, Survey } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";

type Props = {};

const Surveys = (props: Props) => {

  const {showToast} = useContext(StateContext);

  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);


  const getSurveys = (url: string) => {
    url = url || "/survey";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };
  
  const onDeleteClick = (id : number) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys("");
        showToast('The survey was deleted');
      });
    }
  };

  const onPageClick = (link : any ) => {
    getSurveys(link.url);
  };



  useEffect(() => {
    getSurveys("");
  }, []);

  return <PageComponent title="Surveys"
      buttons={
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create new
        </TButton>
      }>
         {loading && <div className="text-center text-lg">Loading...</div>}
         {!loading && (
            <div>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {surveys.map((survey : any) => (
        <SurveyListItem key={survey.id} survey={survey} onDeleteClick={onDeleteClick}/>
      ))}
    </div>
    {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
  </div>
    )}
  </PageComponent>;
};

export default Surveys;
