import { React, useState, useEffect } from "react";
import axios from "axios";
import RectangleCard from "../../components/rectangleCard/rectangleCard";
import RecentActivity from "../../components/recentActivity/recentActivity";
import "./home.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FaUserCircle } from "react-icons/fa";
import useFetch from "../../components/customFetch/customFetch";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const data = {
    labels: ["Events", "User", "Admin", "Opportunities", "Volunteers"],
    datasets: [
      {
        label: " ",
        data: [1, 3, 4, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        cutout: "75%",
      },
    ],
  };

  const plugins = [
    {
      beforeDatasetDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;

        ctx.save();
        ctx.font = "bolder 18px sans-serif";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Contents", xCoor, yCoor + 15);

        ctx.font = "bolder 25px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("Top", xCoor, yCoor - 15);
      },
    },
  ];

  return (
    <>
      <main>
        <div className="upper-dashboard-main">
          <div className="upper-dashboard-main-card">
            <RectangleCard
              title="Total Admins"
              unit="Admin"
              number={"AdminData.length"}
            />
            <RectangleCard
              title="Total Users"
              unit="Learner"
              number={"UserData.length"}
            />
            <RectangleCard
              title="Total Events"
              unit="Event"
              number={"EventData.length"}
            />
          </div>
          <div className="total-info">
            <div className="doughut-wrapper">
              <Doughnut data={data} plugins={plugins} />
            </div>
          </div>
          <div>
            <div className="recent-activity-container">
              <h2>Recent Activities</h2>
              <RecentActivity
                icon={<FaUserCircle />}
                author={"Amen Nafeh"}
                title={"Title Title Title"}
                date={"May 17, 2021"}
                time={"01:00PM"}
              />
              <RecentActivity
                icon={<FaUserCircle />}
                author={"Amen Nafeh"}
                title={"Title Title Title"}
                date={"May 17, 2021"}
                time={"01:00PM"}
              />
              <RecentActivity
                icon={<FaUserCircle />}
                author={"Amen Nafeh"}
                title={"Title Title Title"}
                date={"May 17, 2021"}
                time={"01:00PM"}
              />
              <RecentActivity
                icon={<FaUserCircle />}
                author={"Amen Nafeh"}
                title={"Title Title Title"}
                date={"May 17, 2021"}
                time={"01:00PM"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
