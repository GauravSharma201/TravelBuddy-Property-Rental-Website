import React, { useState } from "react";
import HolidayPackage from "./holidayPackages/holidayPackage";
import { useMediaQuery } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import "./home.css";
// import "./homeSys.css";

function Home() {
  let matches414 = useMediaQuery("(max-width:414px)");
  let [holExpModDis, setHolExpModDis] = useState(false);

  return (
    <>
      <section id="section">
        <HolidayPackage
          prop={{
            path1:
              "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=801&q=80",
            path2:
              "https://images.unsplash.com/photo-1579683670728-96c9abc7a088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
            path3:
              "https://images.unsplash.com/photo-1551418843-01c6b62e864d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            path4:
              "https://images.unsplash.com/photo-1584314620461-90d4239969cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1439&q=80",
            path5:
              "https://images.unsplash.com/photo-1586968425481-3285b99f3b44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            sectionID: "phuketSec",
            sliderName: "phuk",
            top: "thailand is great",
            middle: "thailand",
            bottom: "com to thailand",
            linkAdd: "/thailand/explore",
          }}
        />
        <div className="testBar" id="firstBar">
          <div className="testBarUp">
            <h1>
              {matches414
                ? "holidays planned by experts!.."
                : "get the best holidays planned by experts!.."}
            </h1>
            <button className="">book</button>
          </div>
          <div className={matches414 ? "testBarDownMob" : "testBarDown"}>
            {matches414 ? (
              <>
                <div
                  className="holidayExpOptMod"
                  onClick={() => {
                    setHolExpModDis(!holExpModDis);
                  }}
                >
                  enter your details..
                  <ExpandMore style={{ fontSize: "2.5rem" }} />
                </div>
                <div
                  className={
                    holExpModDis
                      ? "holidayExpOptModWin actvHolExpMod"
                      : "holidayExpOptModWin"
                  }
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="best_holi_nameMod"
                      placeholder="Name.."
                      className="expHolInput"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="best_holi_emailMod"
                      placeholder="email.."
                      className="expHolInput"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      id="best_holi_phoneMod"
                      placeholder="phone.."
                      className="expHolInput"
                    />
                  </div>
                </div>
                <input
                  type="date"
                  name="bookDate"
                  id="best_holi_bookDateMob"
                  className="expHolInputDate"
                />
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="best_holi_name">Name</label>
                  <input type="text" name="name" id="best_holi_name" />
                </div>
                <div>
                  <label htmlFor="best_holi_email">Email</label>
                  <input type="email" name="email" id="best_holi_email" />
                </div>
                <div>
                  <label htmlFor="best_holi_phone">phone</label>
                  <input type="text" name="phone" id="best_holi_phone" />
                </div>
                <div>
                  <input type="date" name="bookDate" id="best_holi_bookDate" />
                </div>
              </>
            )}
          </div>
        </div>
        <HolidayPackage
          prop={{
            path1:
              "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=904&q=80",
            path2:
              "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
            path3:
              "https://images.unsplash.com/photo-1587974136998-4fcc253b6183?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=855&q=80",
            path4:
              "https://images.unsplash.com/photo-1505852149698-5f59260dcce5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            path5:
              "https://images.unsplash.com/photo-1569974439844-17bd35065c97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
            sectionID: "greeceSec",
            sliderName: "gree",
            top: "greece is great",
            middle: "greece",
            bottom: "com to greece",
            linkAdd: "/greece/explore",
          }}
        />
        <div className="testBar" id="secondBar">
          <div className="testBarUp">
            <h1>i want a holiday in..</h1>
          </div>
          <div className="testBarDown">
            <div>
              {matches414 ? "" : <label htmlFor="want_holi_name">Name</label>}
              {matches414 ? (
                <input
                  type="text"
                  name="name"
                  id="want_holi_name"
                  placeholder="Name.."
                />
              ) : (
                <input type="text" name="name" id="want_holi_name" />
              )}
            </div>
            <div>
              <input type="month" name="bookDate" />
            </div>
            <div>
              <button>search</button>
            </div>
          </div>
        </div>
        <HolidayPackage
          prop={{
            path1:
              "https://images.unsplash.com/photo-1490462686240-04979237c723?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
            path2:
              "https://images.unsplash.com/photo-1567067927481-e100decdf5e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
            path3:
              "https://images.unsplash.com/photo-1537639622086-73570d45a9ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
            path4:
              "https://images.unsplash.com/photo-1562594212-f6243aa9b451?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            path5:
              "https://images.unsplash.com/photo-1562592995-052bd28d6539?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            sectionID: "mauritousSec",
            sliderName: "maur",
            top: "mauritius is great",
            middle: "mauritius",
            bottom: "com to mauritius",
            linkAdd: "/mauritius/explore",
          }}
        />
        <div className="sepBar">
          <div>things to to in...</div>
        </div>
        <section className="subSection" id="toDoSec">
          <div className="toDoSecSub">
            <div className="toDo mauritiusBckImg">mauritius</div>
            <div className="toDo dubaiBckImg">dubai</div>
            <div className="toDo baliBckImg">bali</div>
            <div className="toDo singaporeBckImg">singapore</div>
            <div className="toDo greeceBckImg">greece</div>
            <div className="toDo phuketBckImg">phuket</div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Home;
