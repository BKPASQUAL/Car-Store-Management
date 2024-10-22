import React from "react";
import "../assets/css/Dashboard.css";
import Navbar from "../components/common/Navbar";
import {
  useGetAllCarsQuery,
  useGetCarsCountQuery,
} from "../store/api/carStore";
import { useGetAllBrandsQuery } from "../store/api/brands";
import { useGetAllinquiriesQuery } from "../store/api/inquiries";
import { useGetAllUsersQuery } from "../store/api/userApi";
import ReactApexChart from "react-apexcharts";

export default function Dashboard() {
  const { data: carCount } = useGetCarsCountQuery();
  const { data: carData } = useGetAllCarsQuery();
  const { data: brandData } = useGetAllBrandsQuery();
  const { data: inquiriesData } = useGetAllinquiriesQuery();
  const { data: userData } = useGetAllUsersQuery();
  console.log(inquiriesData);
  const brandNames = carCount?.payload?.map((brand) => brand.brandName) || [];
  const carCounts = carCount?.payload?.map((brand) => brand.carCount) || [];

  const chartOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: brandNames,
    },
  };

  const chartSeries = [
    {
      name: "Vehicle Count",
      data: carCounts,
    },
  ];

  return (
    <>
      <Navbar title={"Dashboard"} icon={"dashboard"} />
      <div className="dashboard-container">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-data">
              <h3 className="card-title">Vehicles</h3>
              <p className="card-value">
                {carData?.payload?.length < 10
                  ? `0${carData?.payload?.length}`
                  : carData?.payload?.length}
              </p>
            </div>
            <span className="material-symbols-outlined">traffic_jam</span>
          </div>

          <div className="dashboard-card">
            <div className="card-data">
              <h3 className="card-title">Brands</h3>
              <p className="card-value">
                {brandData?.payload?.length < 10
                  ? `0${brandData?.payload?.length}`
                  : brandData?.payload?.length}
              </p>
            </div>
            <span className="material-symbols-outlined">
              emoji_transportation
            </span>
          </div>

          <div className="dashboard-card">
            <div className="card-data">
              <h3 className="card-title">Inquiries</h3>
              <p className="card-value">
                {inquiriesData?.payload?.length < 10
                  ? `0${inquiriesData?.payload?.length}`
                  : inquiriesData?.payload?.length}
              </p>
            </div>
            <span className="material-symbols-outlined">stacked_email</span>
          </div>

          <div className="dashboard-card">
            <div className="card-data">
              <h3 className="card-title">Users</h3>
              <p className="card-value">
                {userData?.payload?.length < 10
                  ? `0${userData?.payload?.length}`
                  : userData?.payload?.length}
              </p>
            </div>
            <span className="material-symbols-outlined">group</span>
          </div>
        </div>

        <div className="btm-con">
          <div className="chart-con">
            <p>Vehicle Count per Brand</p>
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={450}
              width={800}
            />
          </div>
          <div className="dash-inq-con">
            <p className="dash-inq-title">Recent Inquiries</p>
            {inquiriesData?.payload?.map((inquiry) => (
              <div key={inquiry.id} className="dash-inquiry-card">
                <h4>{inquiry.name}</h4>
                <p>{inquiry.massage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
