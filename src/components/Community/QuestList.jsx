import React, { useState } from "react";
import styles from "./QuestList.module.css";

const QuestList = (props) => {
  const [showList, setShowList] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const handleUpdate = () => {
    showBtn ? setShowBtn(false) : setShowBtn(true);
  };

  const handleShowList = () => {
    showList ? setShowList(false) : setShowList(true);
  };

  return (
    <div className={styles.questCard}>
      <h5>Quest List</h5>
    
      {props.questArray.length > 0 ? (
        <>
          {showList && (
            <>
              <div>
                {props.questArray.map((quest) => {
                  return (
                    <div className={styles.questList} key={quest.id}>
                      <p>{quest.fields.fishquest}</p>
                      {showBtn && (
                        <div>
                          <button
                            className={styles.btn}
                            onClick={() => props.deleteFunc(quest.id)}
                          >
                            X
                          </button>
                          <button
                            className={styles.btn}
                            onClick={() =>
                              props.completeFunc(quest.fields.fishquest)
                            }
                          >
                            &#10003;
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div>
                <button className={styles.updateBtn} onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </>
          )}
          <button className={styles.updateBtn} onClick={handleShowList}>
            {!showList ? <h5>&#8681;</h5> : <h5>&#8679;</h5>}
          </button>
        </>
      ) : (
        <p>Not on any quests</p>
      )}
    </div>
  );
};

export default QuestList;
