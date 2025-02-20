import { parse_3d_file } from "/build/parser.min.js?url";

const MSG_DATA = 0;
const MSG_LOAD = 1;
const MSG_ERROR = 2;
const MSG_STL_LOADED = 3;
const MSG_LOAD_IN_PROGRESS = 4;

let filename = null;
let local_file = null;
let load_from_blob_or_ab = null;
let x = 0;
let y = 0;
let z = 0;
let model_id = -1;
let get_progress = false;
let jszip_path = "jszip.min.js";

function isNumeric(a) {
    return !isNaN(parseFloat(a)) && isFinite(a);
}

function send_error(a) {
    postMessage({ msg_type: MSG_ERROR, data: a });
}

function download_from_local(a) {
    download_from_local_xhr(a);
}

function download_from_local_xhr(a) {
    const e = new XMLHttpRequest();
    get_progress && (e.onprogress = function (a) {
        postMessage({ msg_type: MSG_LOAD_IN_PROGRESS, id: model_id, loaded: a.loaded, total: a.total });
    });
    e.onreadystatechange = function (a) {
        if (e.readyState === 4 && e.status === 200) {
            after_file_load(e.response);
        }
    };
    e.open("GET", a, true);
    e.responseType = "arraybuffer";
    e.send(null);
}

function after_file_load(a) {
    if (a) {
        try {
            parse_3d_file(filename, a, after_file_parse, jszip_path);
        } catch (a) {
            send_error("Error parsing the file");
        }
    } else {
        send_error("no data");
    }
}

function after_file_parse(a) {
    if (typeof a !== "string") {
        postMessage({ msg_type: MSG_STL_LOADED, vertices: a.vertices, faces: a.faces, colors: a.colors });
    } else {
        send_error(a);
    }
}

function read_file(a) {
    const e = new FileReader();
    e.onerror = function (a) {
        let e = "";
        switch (a.target.error.code) {
            case a.target.error.NOT_FOUND_ERR:
                e = "File not found";
                break;
            case a.target.error.NOT_READABLE_ERR:
                e = "Can't read file - too large?";
                break;
            case a.target.error.ABORT_ERR:
                e = "Read operation aborted";
                break;
            case a.target.error.SECURITY_ERR:
                e = "File is locked";
                break;
            case a.target.error.ENCODING_ERR:
                e = "File too large";
                break;
            default:
                e = "Error reading file";
        }
        send_error(e);
    };
    e.onprogress = function (a) {
        postMessage({ msg_type: MSG_LOAD_IN_PROGRESS, id: model_id, loaded: a.loaded, total: a.total });
    };
    e.onload = function (a) {
        after_file_load(a.target.result);
    };
    e.readAsArrayBuffer(a);
}

self.addEventListener("message", function (a) {
    switch (a.data.msg_type) {
        case MSG_DATA:
            if (!a.data.data) {
                send_error("no data");
                break;
            }
            if (!a.data.data.filename && !a.data.data.local_file) {
                send_error("no file");
                break;
            }
            a.data.jszip_path && (jszip_path = a.data.jszip_path);
            if (a.data.data.local_file) {
                filename = a.data.data.local_file.name ? a.data.data.local_file.name : a.data.data.filename;
                local_file = a.data.data.local_file ? a.data.data.local_file : null;
            } else if (a.data.data.filename) {
                filename = a.data.data.filename;
            }
            a.data.data.x && isNumeric(a.data.data.x) && (x = a.data.data.x);
            a.data.data.y && isNumeric(a.data.data.y) && (y = a.data.data.y);
            a.data.data.y && isNumeric(a.data.data.z) && (z = a.data.data.z);
            load_from_blob_or_ab = null;
            a.data.load_from_blob_or_ab && (load_from_blob_or_ab = a.data.load_from_blob_or_ab);
            model_id = a.data.data.id ? a.data.data.id : -1;
            get_progress = !!a.data.get_progress && a.data.get_progress;
            break;
        case MSG_LOAD:
            if (load_from_blob_or_ab) {
                if (load_from_blob_or_ab instanceof ArrayBuffer) {
                    after_file_load(load_from_blob_or_ab);
                } else {
                    read_file(load_from_blob_or_ab);
                }
            } else if (local_file) {
                read_file(local_file);
            } else if (filename) {
                download_from_local(filename);
            }
            break;
        default:
            console.log("invalid msg: " + a.data.msg_type);
    }
});