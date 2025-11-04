$(function() {
    // Khi nh廕叩 n繳t
    $("#btn").on("click", function() {
        layDuLieuKhongKhi();
    });

    $("#btn2").on("click", function() {
        GetAirAPINew2();
    });
   $("#invalue").on("keypress", function(e) {
        if (e.which === 13) { // 13 là mã phím Enter
            e.preventDefault(); // chặn hành vi form tự submit
            GetAirAPINew2();
        }
    });	
});

function layDuLieuKhongKhi() {
    $.ajax({
        url: 'https://data.moenv.gov.tw/api/v2/aqx_p_02?api_key=0831ea1f-f203-4330-afb7-b393f30c00c9',
        method: "GET",
        dataType: "json",
        success: function(data) {
            var record = data.records[53];

            var html =
                "<p><strong>Site:</strong> " + record.site + "</p>" +
                "<p><strong>Country:</strong> " + record.county + "</p>" +
                "<p><strong>PM2.5:</strong> " + record.pm25 + " " + record.itemunit + "</p>" +
                "<p><strong>Date:</strong> " + record.datacreationdate + "</p>";

            $("#airData").hide().html(html).fadeIn(600);
        },
        error: function(err) {
            $("#airData").html("??No Information");
            console.error(err);
        }
    });
}

function GetAirAPINew2() {
    var inValue = $("#invalue").val();

    $.ajax({
        url: 'https://data.moenv.gov.tw/api/v2/aqx_p_02?api_key=95c953fa-19b3-4d31-bbe4-2364bb9d094a',
        method: "GET",
        dataType: "json",
        success: function(data) {
            if (inValue >= 0 && inValue < data.records.length) {
                var record = data.records[inValue];
                var pm = parseFloat(record.pm25);

                
                var color = "";
                if (pm <= 12) {
                    color = "#4CAF50"; 
                } else if (pm <= 35) {
                    color = "#8dfcec"; 
                } else if (pm <= 55) {
                    color = "#FF9800"; 
                } else if (pm <= 150) {
                    color = "#F44336"; 
                } else {
                    color = "#9C27B0"; 
                }

                
                var html =
                    "<p><strong>Site:</strong> " + record.site + "</p>" +
                    "<p><strong>Country:</strong> " + record.county + "</p>" +
                    "<p><strong>PM2.5:</strong> <span style='color:" + color + "; font-weight:bold;'>" +
                    record.pm25 + " " + record.itemunit + "</span></p>" +
                    "<p><strong>Date:</strong> " + record.datacreationdate + "</p>";

                $("#airData").hide().html(html).fadeIn(600);
            } else {
                $("#airData").html(
                    "⚠️ Invalid index (please enter 0 to " + (data.records.length - 1) + ")."
                );
            }
        },
        error: function(err) {
            $("#airData").html("❌ No Information. Please check your network or API key.");
            console.error(err);
        }
    });
}
