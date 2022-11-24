import React, { useState } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { AiFillTag } from "react-icons/all";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Category() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const firestore = useFirestore();
  useFirestoreConnect(["categorys", "write"]);
  const categorySelector = useSelector(
    (state) => state.firestore.data.categorys
  );
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const auth = useSelector((state) => state.firebase.auth);
  const onChange = (e) => {
    setCategory(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    firestore.collection("categorys").doc(category).set({
      CheckUndefined: "",
    });
    setCategory("");
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {auth.uid === import.meta.env.VITE_ADMIN_UID && (
        <div className="mb-12 w-full px-3.5">
          <form
            className="flex flex-row justify-start items-center"
            onSubmit={onSubmit}
          >
            <i className="text-white text-2xl mr-5">
              <AiFillTag />
            </i>
            <input
              className="flex items-center w-full pt-1 pb-1.5 bg-transparent text-white border-x-transparent border-y-transparent border-b-white focus:border"
              onChange={onChange}
              value={category}
              type="text"
              placeholder="추가할 태그를 입력해주세요"
              required
            />
          </form>
        </div>
      )}
      <div className="w-full">
        {categorySelector &&
          Object.keys(categorySelector)
            .filter((categoryName) => {
              return (
                categorySelector[categoryName]?.CheckUndefined !==
                (null || undefined)
              );
            })
            .map((ulCategoryName, index) => {
              return (
                <details id="details" key={index}>
                  <summary>
                    <span title={ulCategoryName} className="mr-6">
                      {ulCategoryName}
                    </span>
                    {auth.uid === import.meta.env.VITE_ADMIN_UID && (
                      <button
                        disabled={loading}
                        className="border border-2 border-gray-400 text-xs rounded-[2px] px-1.5 font-bold"
                        onClick={() => {
                          setLoading(true);
                          const ok = window.confirm("태그를 삭제합니다.");
                          if (ok) {
                            firestore
                              .doc(`categorys/${ulCategoryName}`)
                              .delete();
                            Object.keys(writeSelector)
                              .filter(
                                (ulID) =>
                                  writeSelector[ulID].categoryName ===
                                  ulCategoryName
                              )
                              .forEach((ulcurrentID) =>
                                firestore.doc(`write/${ulcurrentID}`).delete()
                              );
                            setLoading(false);
                          }
                        }}
                      >
                        X
                      </button>
                    )}
                  </summary>
                  {writeSelector &&
                    Object.keys(writeSelector)
                      .filter(
                        (liID) =>
                          writeSelector[liID]?.categoryName === ulCategoryName
                      )
                      .map((licurrentID, index) => {
                        return (
                          <div
                            className="w-[300px]"
                            title={writeSelector[licurrentID].info.title}
                            key={index}
                            onClick={() => navigate(`/detail/${licurrentID}`)}
                          >
                            <span>{writeSelector[licurrentID].info.title}</span>
                          </div>
                        );
                      })}
                </details>
              );
            })}
      </div>
    </div>
  );
}

export default Category;
