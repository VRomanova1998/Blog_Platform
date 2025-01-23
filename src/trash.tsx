// // //   const descriptionPost = `## Est Ampyciden pater patent
// // // ### Amor saxa inpiger
// // // Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.

// // // ### Qua deos has fontibus
// // // Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.

// // // ### Quamvis pronuba
// // // Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.

// // //   1. Clamoribus haesit tenentem iube Haec munera
// // //   2. Vincla venae
// // //   3. Paris includere etiam tamen
// // //   4. Superi te putria imagine Deianira
// // //   5. Tremore hoste Esse sed perstat capillis siqua`;

// // author
// // :
// // {username: 'lllllll', image: 'https://static.productionready.io/images/smiley-cyrus.jpg', following: false}
// // body
// // :
// // "bbb"

// // createdAt
// // :
// // "2025-01-19T08:27:39.495Z"

// // createdAt
// // :
// // "2025-01-19T08:27:35.552Z"
// // description
// // :
// // "bbb"
// // favorited
// // :
// // false
// // favoritesCount
// // :
// // 1
// // slug
// // :
// // "fdgddf-z5vt0v"
// // tagList
// // :
// // ['dfg']
// // title
// // :
// // "bbbbbb"
// // updatedAt
// // :
// // "2025-01-19T10:11:13.838Z"

//   <Form
//         // {...layout}
//         name="nest-messages"
//         onFinish={onFinish}
//         style={{ maxWidth: 600 }}
//         validateMessages={validateMessages}
//         className={styles.container}
//       >
//         <Form.Item name="username" label="Username" layout="vertical" className={styles.section}>
//           <Input className={styles.input} />
//         </Form.Item>
//         <Form.Item
//           name="email"
//           label="Email address"
//           rules={[{ type: 'email' }]}
//           layout="vertical"
//           className={styles.section}
//         >
//           <Input className={styles.input} />
//         </Form.Item>
//         <Form.Item
//           label="Password"
//           name="password"
//           layout="vertical"
//           className={styles.section}
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input className={styles.input} />
//         </Form.Item>
//         <Form.Item
//           label="Repeat Password"
//           name="repeat password"
//           layout="vertical"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//           className={styles.section}
//         >
//           <Input className={styles.input} />
//         </Form.Item>
//         <Form.Item
//           name="agreement"
//           valuePropName="checked"
//           rules={[
//             {
//               validator: (_, value) =>
//                 value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
//             },
//           ]}
//           //   {...tailFormItemLayout}
//         >
//           <Checkbox className={styles.agree}>I agree to the processing of my personal information</Checkbox>
//         </Form.Item>
//         <Button type="primary" htmlType="submit" className={styles.button}>
//           Submit
//         </Button>
//       </Form>

// const layout = {
//   labelCol: { span: 16 },
//   wrapperCol: { span: 32 },
// };

// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

// const onFinish = (values: any) => {
//   console.log(values);
// };

// const tags = tagsArray.map((item, index) => {
//     return (
//       <div key={item.id} className={styles.tagSection}>
//         <input
//           placeholder="Tag"
//           className={styles.tag}
//           {...register(`tags.${item.id}.value`)}
//           defaultValue={item.value}
//         />
//         {/* <button className={styles.deleteButton} onClick={() => deleteTag(item.id)}>
//           Delete
//         </button> */}
//         <button className={styles.deleteButton} onClick={() => remove(index)}>
//           Delete
//         </button>
//         {index === tagsArray.length - 1 && (
//           // <button className={styles.addButton} onClick={() => addTag()}>
//           //   Add Tag
//           // </button>
//           <button className={styles.addButton} onClick={() => append({ value: '' })}>
//             Add Tag
//           </button>
//         )}
//       </div>
//     );
//   });
