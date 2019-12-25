var pool = require("../db/db")
var tableName = 'product';
const fs = require('fs');


module.exports = {
    // get all Record from a table
    async getProduct(req, res) {
        // query
        selectQuery = "SELECT * FROM " + tableName;
        req.data = await pool.query(selectQuery)
            .then(row => { return row })
            // .then(row => { return pool.close() })
            .catch(err => { console.log(err) });
        console.log(req.data);
    },
    // get single Record from table
    async monoProduct(req, res) {
        // query
        selectQuery = "SELECT * FROM " + tableName + " where `productId`= ?";
        await con.query(selectQuery, [req.params.id])
            .then(row => { res.send(row) })
            // .then(row => { return pool.close() })
            .catch(err => { console.log(err) });
    },

    // insert Record into table
    /**
     * insert record to product table but this table has relation hence 
     * in this function there is inner query present 
     */
    async addProduct(req, res) {
        product_name = req.body.product_name;
        product_code = req.body.product_code;
        product_desc = req.body.product_desc;
        seourl = req.body.seourl;
        categoryId = req.body.categoryId;
        ptype = req.body.ptype;
        price = req.body.price;
        sellprice = req.body.sellprice;
        availability = req.body.availability;
        sellingqnt = req.body.sellingqnt;
        returnpolicy = req.body.returnpolicy;
        stonename = req.body.stonename;
        plating = req.body.plating;
        colorcode = req.body.colorcode;
        collectionname = req.body.collectionname;
        displayorder = req.body.displayorder;
        featureproduct = req.body.featureproduct;
        status = req.body.status;

        //outer query
        inserQuery = "INSERT INTO " + tableName + "(`product_name`, ";
        inserQuery += "`product_code`, `product_desc`, `seourl`, `categoryId`, `ptype`, `price`,";
        inserQuery += "`sellprice`, `availability`, `sellingqnt`, `returnpolicy`, `stonename`,";
        inserQuery += "`plating`, `colorcode`, `collectionname`, `displayorder`, `featureproduct`,";
        inserQuery += " `status`)";
        inserQuery += "VALUES";
        inserQuery += "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        //outer query executiion
        insertId = await pool.query(inserQuery, [product_name, product_code, product_desc, seourl, categoryId,
            ptype, price, sellprice, availability, sellingqnt, returnpolicy, stonename,
            plating, colorcode, collectionname, displayorder, featureproduct,
            status])
            .then(row => {
                return row.insertId;
            })
            .catch(err => {
                console.log(err)
            });
        // img = req.files.productImage[3];

        images = req.files.productImage;
        path = `upload/products/${images}`
        for (image in images) {
            path = `upload/products/${images[image].name}`
            images[image].mv(path, err => {
                if (err) {
                    console.log(`upload error ${err}`);
                }
            });
            fs.chown(path, 1000, 1000, (err) => {
                if (err) {
                    cansole.log(`permission error ${err}`);
                }
            });
        }
        console.log(images);
        // image = req.files.productImage[2];
        // images = req.files.productImage[2].name;
        // path = `upload/products/${images}`
        // image.mv(path, err => {
        //     if (!err) {
        //         fs.chown(path, 1000, 1000, (err) => {
        //             console.log(err);
        //         });
        //     }
        // });
        // res.send(path);

        res.end();

        // pid = row.insertId;
        // imageStatus = req.body.imgstatus;
        // is_primary = req.body.imgstatus;

        // (err, row) => {
        //     if (!err) {
        //         pid = row.insertId;
        //         imageStatus = req.body.imgstatus;
        //         is_primary = req.body.imgstatus;

        //         console.log(req.body);
        //         console.log(req.files);
        //         // //inner query
        //         // innerInsertQuery = "INSERT INTO `product_image`(`productId`, "
        //         // innerInsertQuery += "`image_caption`, `imageloc`, `status`, `is_primary`) VALUES ";
        //         // innerInsertQuery += "(?,?,?,?,?)"
        //         // //we need to insert multiple image so looping according to the number of images
        //         // for (i in req.files) {
        //         //     //inner query execution
        //         //     pool.query(innerInsertQuery, [pid, "caption", req.files[i].originalname, imageStatus, is_primary], (err, row) => {
        //         //         if (err) {
        //         //             console.log(err);
        //         //         }
        //         //     })
        //         // }
        //         // //send data to frontend
        //         // res.send("Date is inserted");
        //     }
        //     else {
        //         //log query error message to server and stop execution
        //         console.log("addProduct Query Error", err);
        //         res.end();
        //     }
        // })

    },
    // DELETE p,pi FROM `product` p, `product_image` pi WHERE p.productId = 13 AND pi.productId = 13


    // delete Record from table
    async delProduct(req, res) {
        imageNameQuery = "SELECT imageloc FROM `product_image` WHERE productId = ?";
        test = await pool.query(imageNameQuery, [req.params.id])
            .then(row => { res.send(row) })
            .then(row => { return pool.close() })
            .catch(err => { console.log(err) });
        // res.send(req.data);
        console.log(test);
        // pool.query(imageNameQuery, (err, row) => {
        //     if (!err) {
        //         for (i in row) {
        //             path = "/home/kus3/current_project/gith/upload/products/" + row[i].imageloc;
        //             fs.unlink(path, (err) => {
        //                 if (err) throw err;
        //                 console.log("/upload/products/" + row[i].imageloc + ' was deleted');
        //             });
        //             // console.log("/upload/products/" + row[i].imageloc);

        //             res.send(__dirname);
        //         }
        //     }
        // })
        // query
        // deleteQuery = "DELETE p,pi FROM `product` p, `product_image` pi WHERE p.productId =" + req.params.id + " AND pi.productId = " + req.params.id;
        // pool.query(deleteQuery, (err, row) => {
        //     if (!err) {

        //         res.send("Data deleted successfully");
        //     }
        //     else {
        //         //log query error message to server and stop execution
        //         console.log("delProduct Query Error ", err);
        //         res.end();
        //     }
        // })

        // /upload/products/Screenshot from 2019-12-10 13-38-34.png
        // path = "upload/products/Screenshot from 2019-12-21 12-45-56.png"
        // fs.unlink(path, (err) => {
        //     if (err) throw err;
        //     console.log(path + ' was deleted');
        // });
        // // console.log("/upload/products/" + row[i].imageloc);

        // let sampleFile = req.files;

        // res.send(sampleFile);

    },

    // update a Record in table
    putProduct: (req, res) => {
        //creating connection
        pool.getConnection((err, con) => {
            if (!err) {
                product_name = req.body.product_name;
                product_code = req.body.product_code;
                product_desc = req.body.product_desc;
                seourl = req.body.seourl;
                categoryId = req.body.categoryId;
                ptype = req.body.ptype;
                price = req.body.price;
                sellprice = req.body.sellprice;
                availability = req.body.availability;
                sellingqnt = req.body.sellingqnt;
                returnpolicy = req.body.returnpolicy;
                stonename = req.body.stonename;
                plating = req.body.plating;
                colorcode = req.body.colorcode;
                collectionname = req.body.collectionname;
                displayorder = req.body.displayorder;
                featureproduct = req.body.featureproduct;
                addedon = req.body.addedon;
                status = req.body.status;
                id = req.params.id;
                // console.log(req.body);
                // query
                updateQuery = "UPDATE " + tableName + " SET";
                updateQuery += "`product_name`= ?,";
                updateQuery += "`product_code`= ?,";
                updateQuery += "`product_desc`= ?,";
                updateQuery += "`seourl`= ?,";
                updateQuery += "`categoryId`= ?,";
                updateQuery += "`ptype`= ?,";
                updateQuery += "`price`= ?,";
                updateQuery += "`sellprice`= ?,";
                updateQuery += "`availability`= ?,";
                updateQuery += "`sellingqnt`= ?,";
                updateQuery += "`returnpolicy`= ?,";
                updateQuery += "`stonename`= ?,";
                updateQuery += "`plating`= ?,";
                updateQuery += "`colorcode`= ?,";
                updateQuery += "`collectionname`= ?,";
                updateQuery += "`displayorder`= ?,";
                updateQuery += "`featureproduct`= ?,";
                updateQuery += "`addedon`= ?,";
                updateQuery += "`status`= ? ";
                updateQuery += "WHERE `ProductId` = ?";
                con.query(updateQuery, [product_name, product_code, product_desc, seourl, categoryId,
                    ptype, price, sellprice, availability, sellingqnt, returnpolicy, stonename, plating, colorcode,
                    collectionname, displayorder, featureproduct, addedon, status, id], (err, row) => {
                        // When done with the connection, release it.
                        con.release()
                        if (!err) {
                            //send data to frontend
                            res.send("Data Updated successfully");
                        }
                        else {
                            //log query error message to server and stop execution
                            // that was passed to callDirectorySearch
                            cb(response.statusCode);
                            //log db error message to server and stop execution
                            console.log("putProduct DB ERROR", err);
                            res.end();
                        }
                    }
                );
            }

        });


    }
}
